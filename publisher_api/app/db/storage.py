from pymongo import MongoClient
from pymongo.collection import Collection

from app.configuration import MONGO

MONGODB_INSTANCE = None


def __build_connection_str() -> str:
    password = MONGO['password']
    conn_str = '{protocol}://{username}:{password}@{host}/{dbname}?ssl=false'
    return conn_str.format(
        protocol=MONGO['protocol'],
        username=MONGO['username'],
        password=password,
        host=MONGO['host'],
        dbname=MONGO['dbname']
    )


def get_connection() -> MongoClient:
    global MONGODB_INSTANCE
    if MONGODB_INSTANCE is None:
        conn_str = __build_connection_str()

        MONGODB_INSTANCE = MongoClient(
            conn_str, uuidRepresentation='standard', tz_aware=True)

    return MONGODB_INSTANCE


def get_mongodb_collection(collection_name: str) -> Collection:
    return get_connection()[MONGO['dbname']][collection_name]
