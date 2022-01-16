import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import base64
from io import BytesIO


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
