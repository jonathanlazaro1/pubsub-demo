import os

PUBSUB = {
    "project_id": os.getenv("PUBSUB_PROJECT_ID", None),
    "topic_id": os.getenv("PUBSUB_TOPIC_ID", None)
}

MONGO = {
    'protocol': os.getenv('MONGO_PROTOCOL', 'mongodb+srv'),
    'host': os.getenv('MONGO_HOST', None),
    'username': os.getenv('MONGO_USER', None),
    'password': os.getenv('MONGO_PASSWORD', None),
    'dbname': os.getenv('MONGO_DBNAME', None),
}
