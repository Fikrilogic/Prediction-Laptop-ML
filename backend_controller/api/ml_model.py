from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.neighbors import KNeighborsClassifier


class DecisionTreePipeline():

    def __init__(self):
        self.transform = ColumnTransformer(remainder="passthrough",
                                           transformers=[('onehot', OneHotEncoder(), [0, 1, 2, 3, 5, 6, 7, 8, 10])],
                                           sparse_threshold=0)
        self.model = DecisionTreeClassifier(criterion='entropy', random_state=24, max_depth=8, max_leaf_nodes=8)
        self.pipe = Pipeline([
            ('preprocessing', self.transform),
            ('model', self.model)
        ])

    def fit(self, x, y):
        self.pipe = self.pipe.fit(x, y)
        return self.pipe

    def predict(self, data):
        return self.pipe.predict(data)

    def get_pipeline(self):
        return self.pipe


class NaiveBayesPipeline():
    def __init__(self):
        self.transform = ColumnTransformer(remainder="passthrough",
                                           transformers=[('onehot', OneHotEncoder(), [0, 1, 2, 3, 5, 6, 7, 8, 10])],
                                           sparse_threshold=0)
        self.model = GaussianNB()
        self.pipe = Pipeline([
            ('preprocessing', self.transform),
            ('model', self.model)
        ])

    def fit(self, x, y):
        self.pipe = self.pipe.fit(x, y)
        return self.pipe

    def predict(self, data):
        return self.pipe.predict(data)

    def get_pipeline(self):
        return self.pipe


class KNeighborsPipeline():

    def __init__(self):
        self.transform = ColumnTransformer(remainder="passthrough",
                                           transformers=[('onehot', OneHotEncoder(), [0, 1, 2, 3, 5, 6, 7, 8, 10])],
                                           sparse_threshold=0)
        self.model = KNeighborsClassifier(n_neighbors=3, weights='distance', algorithm='kd_tree')
        self.pipe = Pipeline([
            ('preprocessing', self.transform),
            ('model', self.model)
        ])

    def fit(self, x, y):
        self.pipe = self.pipe.fit(x, y)
        return self.pipe

    def predict(self, data):
        return self.pipe.predict(data)

    def get_pipeline(self):
        return self.pipe


class GradientBoostPipeline():

    def __init__(self):
        self.transform = ColumnTransformer(remainder="passthrough",
                                           transformers=[('onehot', OneHotEncoder(), [0, 1, 2, 3, 5, 6, 7, 8, 10])],
                                           sparse_threshold=0)
        self.model = GradientBoostingClassifier(loss='exponential', criterion='friedman_mse', learning_rate=0.05,
                                                min_samples_leaf=8, random_state=10)
        self.pipe = Pipeline([
            ('preprocessing', self.transform),
            ('model', self.model)
        ])

    def fit(self, x, y):
        self.pipe = self.pipe.fit(x, y)
        return self.pipe

    def predict(self, data):
        return self.pipe.predict(data)

    def get_pipeline(self):
        return self.pipe
