import logging

from google.api_core import gapic_v1
from google.cloud import pubsub_v1

from app import configuration
from app.client.event.model import Event


class PubSubClient():

    def publish_event(self, event: Event):
        project_id = configuration.PUBSUB["project_id"]
        topic_id = configuration.PUBSUB["topic_id"]

        publisher = pubsub_v1.PublisherClient()
        topic_path = publisher.topic_path(project_id, topic_id)

        logging.info('Publishing event #%s, type %s',
                     event.event_id, event.type)

        data = event.message.json(by_alias=True)
        data = data.encode('utf-8')

        try:
            future = publisher.publish(
                topic_path, data, ordering_key="", retry=gapic_v1.method.DEFAULT, **event.get_attributes())
            message_id = future.result()
            logging.debug(
                'Event #%s was published. Message Id: %s.', event.event_id, message_id)
        except Exception as err:
            logging.error('Error while publishing event #%s: %s',
                          event.event_id, err)
            pass
