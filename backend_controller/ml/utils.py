from django.utils.deconstruct import deconstructible

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import base64
from io import BytesIO
import os


@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        # return the whole path to the file
        return os.path.join(self.path, filename)


def get_graph():
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph


def convert_to__dict_graph(data):
    result = []
    label = [x for x in data]
    label.pop(0)
    name = [x[0] for x in data.values]
    df = data.iloc[:, 1:5]
    for n in df.columns:
        graph = createplot(n, df[n], name)
        result.append({n: graph})

    return result



def createplot(label, data, name):
    df = pd.DataFrame({'Metode': name, label: [int(n*100) for n in data]})
    plt.switch_backend('AGG')
    plt.figure(figsize=(8, 8))
    plt.title(f"{label} report".upper())
    sns.set_theme(style='whitegrid')
    ax = sns.barplot(data=df, x=name, y=label)
    for p in ax.patches:
        percentage = '{}%'.format(10 * p.get_height() / 10)
        x = p.get_x() + 0.4
        y = p.get_height() + 1
        ax.annotate(percentage, (x, y), ha='center')
    plt.xticks(rotation=-15)
    plt.yticks(range(10, 100, 10))
    graph = get_graph()
    return graph


def create_cross_val_dict(data):
    result = []
    turn = list(range(1,11))
    for n in range(len(data)):
        name = data.iloc[n, 0]
        acc_score = list(data.iloc[n, 1:])

        plot_data = pd.DataFrame({'turn': turn, 'accuracy': acc_score})
        graph = create_crossval_plot(plot_data, name)
        result.append({'metode': name, 'graph': graph})

    return result

def create_crossval_plot(data_dict, name):
    plt.switch_backend('AGG')
    plt.figure(figsize=(8, 8))
    plt.title(f"{name} Method")
    sns.lineplot(data=data_dict, x=data_dict['turn'], y='accuracy')
    plt.xticks(np.linspace(1, 10, 10))
    plt.yticks(np.linspace(0, 1, 11))
    plt.xlabel('KFOLD')
    graph = get_graph()
    return graph

