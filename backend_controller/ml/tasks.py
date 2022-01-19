from api.models import MasterDataset
from .models import MasterTrainingResult, MasterModel, MasterCrossvalResult

from huey import crontab
from huey.contrib.djhuey import periodic_task, task
from django.core.files.base import ContentFile
import pandas as pd
import pickle

from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Model Pipeline
column_trans = ColumnTransformer(remainder="passthrough",
                                 transformers=[('encode', OrdinalEncoder(handle_unknown="use_encoded_value",
                                                                         unknown_value=30),
                                                [0, 2, 3, 5, 6, 7, 8, 10])],
                                 sparse_threshold=0
                                 )

knn = KNeighborsClassifier(n_neighbors=5, weights='distance', algorithm='kd_tree')
dt = DecisionTreeClassifier(criterion='entropy', random_state=24, max_depth=10, max_leaf_nodes=20)
gb = GradientBoostingClassifier(criterion='friedman_mse', learning_rate=1, min_samples_leaf=8, max_leaf_nodes=20,
                                random_state=0)

knn_pipeline = Pipeline(steps=[('preprocessing', column_trans),
                               ('K-Nearest Neighbors Classifier', knn)
                               ])
dt_pipeline = Pipeline(steps=[('preprocessing', column_trans),
                              ('Decision Tree Classifier', dt)
                              ])
nb_pipeline = Pipeline(steps=[('preprocessing', column_trans),
                              ('Naive Bayes Classifier', GaussianNB())
                              ])
gb_pipeline = Pipeline(steps=[('preprocessing', column_trans),
                              ('Gradient Boost Decision Tree Classifier', gb)
                              ])


# Helper Function
def get_dataset():
    query = MasterDataset.objects.all()
    data = query.values('kebutuhan_id__name', 'budget', 'cpu_id__name', 'gpu_id__name', 'ram', 'memory_id__type',
                        'company_id__name', 'screen_id__type', 'resolution_id__resolution', 'weight', 'type_id__name',
                        'price',
                        'name')
    df = pd.DataFrame(data)
    return df


def save_result(x_test, y_test, model, file):
    method = file
    predict = method.predict(x_test)

    try:
        data = MasterTrainingResult.objects.get(method_id=model[0].id)
        data.accuracy = accuracy_score(y_test, predict)
        data.recall = recall_score(y_test, predict, average='weighted', zero_division=0)
        data.precision = precision_score(y_test, predict, average='weighted', zero_division=0)
        data.f1_score = f1_score(y_test, predict, average='weighted', zero_division=0)
        data.save()
    except MasterTrainingResult.DoesNotExist:
        MasterTrainingResult.objects.create(
            method_id=model[0].id,
            accuracy=accuracy_score(y_test, predict),
            recall=recall_score(y_test, predict, average='weighted'),
            precision=precision_score(y_test, predict, average='weighted'),
            f1_score=f1_score(y_test, predict, average='weighted'),
        )


def cross_validation_testing(x, y, model, file):
    try:
        list_score = cross_val_score(file, x, y, cv=KFold(n_splits=10), scoring='accuracy')
        kfold_f1 = cross_val_score(file, x, y, cv=KFold(n_splits=10), scoring='f1_weighted')
        kfold_recall = cross_val_score(file, x, y, cv=KFold(n_splits=10), scoring='recall_weighted')
        kfold_precision = cross_val_score(file, x, y, cv=KFold(n_splits=10), scoring='precision_weighted')
    except ValueError as e:
        print(str(e))

    kfold_result = [
        {'name': model[0].name, 'precision': kfold_precision},
        {'name': model[0].name, 'recall': kfold_recall},
        {'name': model[0].name, 'f1': kfold_f1},
    ]
    print('10 KFOLD Result :\n {}'.format(kfold_result))

    try:
        data = MasterCrossvalResult.objects.get(model_id=model[0].id)
        data.test1 = list_score[0]
        data.test2 = list_score[1]
        data.test3 = list_score[2]
        data.test4 = list_score[3]
        data.test5 = list_score[4]
        data.test6 = list_score[5]
        data.test7 = list_score[6]
        data.test8 = list_score[7]
        data.test9 = list_score[8]
        data.test10 = list_score[9]
        data.save()
    except MasterCrossvalResult.DoesNotExist:
        MasterCrossvalResult.objects.create(
            model_id=model[0].id,
            test1=list_score[0],
            test2=list_score[1],
            test3=list_score[2],
            test4=list_score[3],
            test5=list_score[4],
            test6=list_score[5],
            test7=list_score[6],
            test8=list_score[7],
            test9=list_score[8],
            test10=list_score[9],
            mean=list_score.mean(),
            name=model[0].name
        )


# Task for Training Model

# K-Nearest Neighbors
@periodic_task(crontab(minute='*/1'))
def retrain_knn_model():
    df = get_dataset()

    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=20)
    m = knn_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='K-Nearest Neighbors',
        desc='Model with KNN Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='knn_model.pkl')
    save_result(x_test, y_test, model, m)
    cross_validation_testing(data, target, model, m)


# DECISION TREE
@periodic_task(crontab(minute='*/1'))
def retrain_dt_model():
    df = get_dataset()
    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=20)
    m = dt_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='Decision Tree',
        desc='Model with DT Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='dt_model.pkl')
    save_result(x_test, y_test, model, m)
    cross_validation_testing(data, target, model, m)


# gdbt
@periodic_task(crontab(minute='*/1'), retries=2, delay=5)
def retrain_gbdt_model():
    df = get_dataset()
    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=20)
    m = gb_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='Gradient Boosting',
        desc='Model with GBDT Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='gbdt_model.pkl')
    save_result(x_test, y_test, model, m)
    cross_validation_testing(data, target, model, m)


# Naive Bayes
@periodic_task(crontab(minute='*/1'))
def retrain_nb_model():
    df = get_dataset()
    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.1, random_state=20)
    m = nb_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='Naive Bayes',
        desc='Model with Naive Bayes Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='nb_model.pkl')
    save_result(x_test, y_test, model, m)
    cross_validation_testing(data, target, model, m)
