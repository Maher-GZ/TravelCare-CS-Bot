from flask import Flask
import uuid
import requests
from .update_dates import update_dates
from langchain_core.messages import ToolMessage
from .graph import part_3_graph
from .update_dates import db
from .utilities import _print_event

thread_id = str(uuid.uuid4())

_printed = set()
def get_final_message(events):
    """Extracts the final AI message from the list of events."""
    final_message = None
    for event in events:
        final_message = _print_event(event, _printed)
    return final_message

previous_question = ""
def agent(passenger_id, question):
    global previous_question
    valid_responses = {"yes", "no", "y", "n"}
    user_input = question.strip().lower()
    config = {
        "configurable": {
            "passenger_id": passenger_id,
            "thread_id": thread_id,
        }
    }
    try:
        if user_input in valid_responses:
            previous_question = user_input
            events = list(part_3_graph.stream(
                {"messages": [{"role": "user", "content": previous_question}]},
                config,
                stream_mode="values",
            ))  # Convert the generator to a list

            final_message = get_final_message(events)
            snapshot = part_3_graph.get_state(config)

            # Initialize `result` with a default value
            result = None
            while snapshot.next:
                if user_input in {"y", "yes"}:
                    result = part_3_graph.invoke(
                        None,
                        config,
                    )
                else:
                    result = part_3_graph.invoke(
                        {
                            "messages": [
                                ToolMessage(
                                    tool_call_id=events[-1]["messages"][-1].tool_calls[0]["id"],
                                    content=f"API call denied by user. Reasoning: '{user_input}'. Continue assisting, accounting for the user's input.",
                                )
                            ]
                        },
                        config,
                    )
                snapshot = part_3_graph.get_state(config)

            # Ensure `result` is valid before returning it
            return get_final_message(result) if result else final_message

        else:
            # Handle new user input
            previous_question = user_input
            events = list(part_3_graph.stream(
                {"messages": [{"role": "user", "content": user_input}]},
                config,
                stream_mode="values",
            ))  # Convert the generator to a list

            final_message = get_final_message(events)
            snapshot = part_3_graph.get_state(config)

            if snapshot.next:
                result = part_3_graph.invoke(
                    {
                        "messages": [
                            ToolMessage(
                                tool_call_id=events[-1]["messages"][-1].tool_calls[0]["id"],
                                content=f"API call denied by user. Reasoning: '{user_input}'. Continue assisting, accounting for the user's input.",
                            )
                        ]
                    },
                    config,
                )
                snapshot = part_3_graph.get_state(config)
                return "Do you approve of the above actions? (Yes/No)"

            return final_message
    except Exception as e:
        return f"An error occurred: {str(e)}"
