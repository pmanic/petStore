from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests


class ActionFetchPets(Action):

    def name(self) -> Text:
        return "action_fetch_pets"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        try:
            response = requests.get("https://api.npoint.io/105b23dafb9500adcbe8", timeout=5)
            response.raise_for_status()
            print("[action_fetch_pets response]:", response.text)

            pets = response.json()
            if not pets:
                dispatcher.utter_message(text="Sorry, I couldn’t find any pets right now.")
                return []

            for pet in pets[:3]:
                message = (
                    f"🐾 *{pet['name']}* ({pet['species']})\n"
                    f"{pet['description'][:100]}...\n"
                    f"*Age:* {pet['age']}\n"
                    f"*Size:* {pet['size']}\n"
                    f"*Origin:* {pet['origin']}\n"
                    f"[🔍 View details](/pets/{pet['id']})"
                )
                dispatcher.utter_message(text=message)

        except Exception as e:
            print(f"[action_fetch_pets error]: {e}")
            dispatcher.utter_message(text="Oops! Something went wrong while fetching pets.")

        return []
