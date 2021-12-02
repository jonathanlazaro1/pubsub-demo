from pydantic import BaseModel

from app.client.event.model import Event, EventType
from app.client.pubsub import PubSubClient
from app.db.storage import get_mongodb_collection


class EventClient:

    def process(self, event_type: EventType, message: BaseModel) -> Event:
        event = Event(
            type=event_type,
            message=message
        )

        result = get_mongodb_collection(
            "events").insert_one(event.dict(by_alias=True, exclude={"event_id"}))
        event.event_id = str(result.inserted_id)

        PubSubClient().publish_event(event)

        return event.dict(by_alias=True)
