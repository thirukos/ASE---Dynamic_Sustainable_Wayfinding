# ASE---Dynamic_Sustainable_Wayfinding

The goal of this project is to provide real-time wayfinding for travellers that improves the reliability of the mobility experience across all transportation modes. It will build intelligence at the edges of the network (i.e., decentralised), while providing real-time decision-making and decision support to very large numbers of travellers, across a wide range of transportation modes (including pedestrian, bike, car, bus, tram, train and taxi) tailored to their individual priorities (pollution avoidance, emissions reduction, speed, reliability, comfort etc.). A single trip should involve multiple modes of transport, which has to be modified en-route, as a result of changes in the environment, e.g., congestion, noise pollution, crowded and so on. Your system should monitor the environment for events relating to such changes.
 
Some of the main challenges include identifying when a user’s interests are likely to conflict with sustainability goals, how a user can be incentivised to choose a more sustainable travel plan, and when to trigger an adaptation of the travel plan in line with users’ preferences

Each trip must:

++ Be multi-modal. The options presented to the traveller should include three or more modes, and the demonstration of the overall system should illustrate multiple different routes, with all mode options (listed above) used at least once. Each route should include more than one public transport mode option. Real-time data should be used, when available. Where real-time data is not available, options should be simulated. This means that a sample trip should be around 20Km across the city, not following a city’s buses pattern.           
++ Be adaptive. The system should adapt a route AFTER the traveller has started. This is likely to require simulation of some event that has a negative impact on the previously identified route (e.g., unexpected closure of a road, or tree on the Luas line), requiring the traveller to change modes, in real time.
 
The system must:

1. Be highly available. The system must be fault tolerant. The system should execute even when off-line. The system must react favourably even if data from heterogeneous sources are not available. When offline, the system should find relevant information from surrounding available sources about all required modes of transport;
2. Provide low latency for mobile users. 
3. Be secure. The system should be secure from attack.
4. Be flexible: The system should allow flexible addition and management of heterogeneous data sources. This means that hard coded APIs calls should be avoided in the code.
