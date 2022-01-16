import matplotlib.pyplot as plt
import seaborn as sns
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
        print(type(graph))
        result.append({n: graph})

    return result


def createplot(label, data, x):
    plt.switch_backend('AGG')
    plt.figure(figsize=(5, 5))
    plt.title(label)
    sns.histplot(data, x=x)
    plt.xlabel('Algorithm')
    plt.ylabel(f'{label}_value')
    graph = get_graph()
    return graph
