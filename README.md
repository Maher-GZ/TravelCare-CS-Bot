
# TravelCare-CS-Bot

TravelCare-CS-Bot is a customer support agent designed to assist with booking hotels, flights, renting cars, and suggesting excursions. Built on OpenAI's GPT-3.5 model, the agent always asks for **user approval before taking any action**. The user must respond with **"yes"** or **"no"** to confirm before the bot proceeds with any booking or service. The bot can also provide information on company policies, such as cancellation rules and booking conditions.

## Features

- **Hotel Booking**: Help users find and book hotels based on their preferences.
- **Flight Booking**: Assist with flight bookings by recommending the best flights and prices.
- **Car Rental**: Help users rent cars at their travel destination.
- **Excursion Suggestions**: Offer personalized suggestions for excursions based on user interests and location.
- **Company Policies**: Users can ask the agent about the company's policies, such as cancellation policies, booking conditions, and more.

### User Approval Before Action

Before the agent takes any action (e.g., booking, flight purchasing, car rentals, or excursion finalizing), it will **always ask for user approval**. The agent will summarize the proposed action and wait for user input. If the response is **"yes"**, the agent proceeds; if **"no"**, no action is taken.

## Dependencies

The project uses the following tools and frameworks:

- **OpenAI GPT-3.5**: For natural language understanding and response generation.
- **LangChain**: A framework to manage workflows with language models, used here to handle user requests.
- **LangGraph**: Utilized for the customer support workflows and integrating GPT-3.5 responses.

To get started, refer to the notebook [LangChain Customer Support Tutorial](https://langchain-ai.github.io/langgraph/tutorials/customer-support/customer-support/).

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repository/travelcare-cs-bot.git
   cd travelcare-cs-bot
   ```

2. **Install dependencies**:
   You can install the required dependencies using `pip`:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up OpenAI API key**:
   Make sure you have an OpenAI account and set your GPT-3.5 API key in the environment variables:
   ```bash
   export OPENAI_API_KEY="your-api-key"
   ```


## Usage

Once the notebook is running, you can interact with the agent by providing input for various travel-related services (hotels, flights, car rentals, excursions). When the agent prepares to take action, it will:

1. **Present the proposed action** to the user, such as flight details or car rental options.
2. **Ask for confirmation** with a prompt like: "Do you want to proceed with this booking? (yes/no)"
3. **Wait for user input**. If the user responds with **"yes"**, the agent will proceed. If the response is **"no"**, the agent will cancel the action and may suggest alternatives.

Additionally, users can ask the agent about the company's policies, and the agent will provide relevant information about booking rules, cancellation policies, and more.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Please make sure to follow the coding guidelines and write tests for new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project leverages the powerful LangChain and GPT-3.5 from OpenAI, as well as other useful libraries that help provide a seamless user experience.
