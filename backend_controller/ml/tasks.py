from api.models import MasterDataset
from .models import MasterTrainingResult, MasterModel

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
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

column_trans = ColumnTransformer(remainder="passthrough",
                                 transformers=[('encode', OrdinalEncoder(), [0, 2, 3, 5, 6, 7, 8, 10])],
                                 sparse_threshold=0
                                 )

knn = KNeighborsClassifier(n_neighbors=5, weights='distance', algorithm='kd_tree')
dt = DecisionTreeClassifier(criterion='entropy', random_state=24, max_depth=10, max_leaf_nodes=20)
gb = GradientBoostingClassifier(criterion='friedman_mse', learning_rate=0.05, min_samples_leaf=8, max_leaf_nodes=15,
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


    MasterTrainingResult.objects.update_or_create(
        method_id=model[0].id,
        accuracy=accuracy_score(y_test, predict),
        recall=recall_score(y_test, predict, average='micro'),
        precision=precision_score(y_test, predict, average='micro'),
        f1_score=f1_score(y_test, predict, average='micro'),
    )


# K-Nearest Neighbors
@periodic_task(crontab(minute='*/1'), retries=2, delay=10)
def retrain_knn_model():
    df = get_dataset()

    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.1, random_state=20)
    m = knn_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='K-Nearest Neighbors',
        desc='Model with KNN Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='knn_model.pkl')
    save_result(x_test, y_test, model, m)


# DECISION TREE
@periodic_task(crontab(minute='*/1'), retries=2, delay=10)
def retrain_dt_model():
    df = get_dataset()
    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.1, random_state=20)
    m = dt_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='Decision Tree',
        desc='Model with DT Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='dt_model.pkl')
    save_result(x_test, y_test, model, m)


# gdbt
@periodic_task(crontab(minute='*/1'), retries=2, delay=10)
def retrain_gbdt_model():
    df = get_dataset()
    target = df['name']
    data = df.drop('name', axis='columns')

    x_train, x_test, y_train, y_test = train_test_split(data, target, test_size=0.1, random_state=20)
    m = gb_pipeline
    m.fit(x_train, y_train)
    model = MasterModel.objects.get_or_create(
        name='Gradient Boost Decision Tree',
        desc='Model with GBDT Algorithm'
    )
    model[0].path.delete(save=False)
    model[0].path.save(content=ContentFile(pickle.dumps(m)), name='gbdt_model.pkl')
    save_result(x_test, y_test, model, m)


# Naive Bayes
@periodic_task(crontab(minute='*/1'), retries=2, delay=10)
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
