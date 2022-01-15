import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score, train_test_split, KFold
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import GradientBoostingClassifier
import joblib


"""
convert excel dataset to dataframe
"""
data = pd.read_csv('dataset_laptop.xlsx')


"""Checking & Visualization Data

"""
numeric = data[['ram', 'weight']]
for col in numeric.columns:
  plt.figure(figsize=(10,10))
  sns.countplot(data=data, x=col, palette='pastel')
  plt.title(col.upper(), fontsize=30, pad=20)
  plt.xticks(rotation=45)
  plt.show()

columns = data.drop(['ram', 'weight'], axis=1)

for column in columns.columns:
    plt.figure(figsize=(15,8))
    sns.countplot(data=data, x=column, palette='pastel')
    plt.title(column.upper().replace('_', ' '), fontsize=30, pad=20)
    plt.xticks(rotation=45)
    plt.show()

"""CLEANING DATA & FEATURE ENGINEERING IN DATASET"""

data['kebutuhan'].value_counts()

"""Feature Engineering column GPU"""

data['gpu_merk'] = data['gpu'].str.split(" ", 1).map(lambda x: x[0])
merk = data.pop('gpu_merk')
data.insert(2, 'gpu_merk', merk)
data.info()

data['gpu'] = data['gpu'].str.split(" ", 1).map(lambda x: x[1])

data.head()

y = data['prediksi']
X = data.drop('prediksi', axis='columns')

X

"""Preprocessing Data"""
"""Sort column by budget"""
X = X.sort_values(by="budget")


"""Modelling with Column Transformer & Pipeline
"""
column_trans = ColumnTransformer(remainder="passthrough", transformers=[('onehot',OneHotEncoder(), [0,1,2,3,5,6,7,8,10])], sparse_threshold=0
)

column_trans.fit_transform(X)


"""Spliting Data training & Testing"""

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=99, test_size = 0.20)

"""
Looking shape of data after split
"""
print('feature train shape: ',X_train.shape)
print('feature test shape:',X_test.shape)
print('target train shape: ',y_train.shape)
print('target test shape: ',y_test.shape)

"""
Modeling Machine Learning
"""

"""Naive Bayes Pipeline"""
NB = GaussianNB()
nb_model_pipelines = Pipeline(steps=[
                       ('preprocessing', column_trans),
                       ('naive_bayes_model', NB)
                       ])

nb_model_pipelines.fit(X_train, y_train)

"""
Looking accuracy after cross validation on data training
"""
print(cross_val_score(nb_model_pipelines, X_train, y_train, cv=KFold(n_splits=7), scoring='accuracy').mean())

"""
Looking accuracy after cross validation on data test
"""
test_kfold = cross_val_score(nb_model_pipelines, X_test, y_test, cv=KFold(n_splits=7), scoring='accuracy').mean()
test_kfold

"""
Confusion Matrix on Naive Bayes
"""
nb_predict = nb_model_pipelines.predict(X_test)
matrix = confusion_matrix(y_test, nb_predict)
print(matrix)

"""
Classification report on Naive Bayes"""
nb_evaluate = classification_report(y_test, nb_predict)
print("Naive Bayes Clasiffier Report: \n", nb_evaluate)


"""Decision Tree Model Pipeline"""


dt = DecisionTreeClassifier(criterion='entropy', random_state=24, max_depth=8, max_leaf_nodes=8)

dt_pipe = Pipeline(steps=[('preprocessing', column_trans),
                       ('dt_model', dt)
                       ])

dt_pipe.fit(X_train, y_train)

dt_test_kfold_train = cross_val_score(dt_pipe, X_train, y_train, cv=KFold(n_splits=7), scoring='accuracy').mean()
dt_test_kfold_train

dt_test_kfold = cross_val_score(dt_pipe, X_test, y_test, cv=KFold(n_splits=7), scoring='accuracy').mean()
dt_test_kfold

dt_predict = dt_pipe.predict(X_test)
matrix = confusion_matrix(y_test, dt_predict)
matrix

dt_evaluate = classification_report(y_test, dt_predict)
print("Decision Tree Classifier Report: \n", dt_evaluate)

"""KNN model pipeline"""

knn = KNeighborsClassifier(n_neighbors=3, weights='distance', algorithm='kd_tree')

knn_pipeline = Pipeline(steps=[('preprocessing', column_trans),
                       ('knn', knn)
                       ])

knn_pipeline.fit(X_train, y_train)

knn_kfold_train_test = cross_val_score(knn_pipeline, X_train, y_train, cv=KFold(n_splits=5), scoring='accuracy').mean()
knn_kfold_train_test

knn_kfold_test = cross_val_score(knn_pipeline, X_test, y_test, cv=KFold(n_splits=5), scoring='accuracy').mean()
knn_kfold_test

knn_predict = knn_pipeline.predict(X_test)
confusion_matrix(y_test, knn_predict)

knn_evaluate = classification_report(y_test, knn_predict)
print("K-Nearest Neighbors Classifier Report: \n", knn_evaluate)

"""Gradient Boost Decision Tree"""

GB = GradientBoostingClassifier(loss='exponential',criterion='friedman_mse', learning_rate=0.05, min_samples_leaf=8, random_state=10)
gb_pipeline = Pipeline(steps=[('preprocessing', column_trans),
                       ('gbdt', GB)
                       ])

gb_pipeline.fit(X_train, y_train)

gb_kfold_test_train = cross_val_score(gb_pipeline, X_train, y_train, cv=KFold(n_splits=5), scoring='accuracy').mean()
gb_kfold_test_train

gb_kfold_test = cross_val_score(gb_pipeline, X_test, y_test, cv=KFold(n_splits=5), scoring='accuracy').mean()
gb_kfold_test

gb_predict = gb_pipeline.predict(X_test)
matrix = confusion_matrix(y_test, gb_predict, labels=['Gaming','Office'])
matrix

gb_evaluate = classification_report(y_test, gb_predict)
print("Gradient Boosting Classifier Report: /n", gb_evaluate)


"""
Convert model to Pickle"""
joblib.dump(nb_model_pipelines, '../backend_controller/ml/ml_model/NaiveBayes_Model.pkl')

joblib.dump(dt_pipe, '../backend_controller/ml/ml_model/DecisionTree_Model.pkl')

joblib.dump(knn_pipeline, '../backend_controller/ml/ml_model/KNearest_Neighbors_Model.pkl')

joblib.dump(gb_pipeline, '../backend_controller/ml/ml_model/GradientBoosting_Model.pkl')


