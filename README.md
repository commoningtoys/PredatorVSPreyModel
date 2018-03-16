<h1>Predator and Prey Model</h1>

<h2><a href="https://commoningtoys.github.io/PredatorVSPreyModel/">WEB APP</a></h2>
The model is based on the following simple rules:
<h3>Prey:</h3>
<li>Tries to move in a random direction.</li>
<li>Health increases.</li>
<li>When health reaches a threshold:</li>
<li>They will reproduce, creating a new "Prey"</li>
<li>Their health resets to 1</li>
<h3>Predator:</h3>
<li>Tries to move in a random direction.</li>
<li>Health decreases.</li>
<li>When health reaches 0, they die and turn into "Nothing".</li>
<li>If the adjacent square is a prey: They will eat it, turning it into a "predator" (reproducing) Their health will increase by the amount of health the eaten prey had</li>
<h2>How it works</h2>
The AgentModel class creates a grid of agents, the agets can be: preys, predators or nothing.<br>
Each frame the model is updated. First by updating the health of the agents, than they are moved. The agents can move only in the adiacent free cells, it means either up, down, left and right, Diagonal movement are not allowed. <code>move(x, y)</code> tries to move the agent to a random direction <code>moveUp(x, y)</code> <code>moveRight(x, y)</code> <code>moveDown(x, y)</code> <code>moveLeft(x, y)</code>, if the agent finds himself at one of the edges than the <code>move(x, y)</code> function is called again until it can move to one of the directions.<br>
Once the agent is moved the <code>moveUp/Right/Down/Left(x, y)</code> function checks wheter the neighbour was a predator in that case the prey is eaten and the predator reproduces getting the health of the eaten prey.<br>
There are four values to change wth the slider
<li>The threshold, that is the rate by which the prey reproduce</li>
<li>The maximum health of every single Agent</li>
<li>The initial number of empty or cells</li>
<li>The proportion between predators and preys</li>
The play button restarts the model with the new values.<br>
With the <code>LEFT</code> mouse button is possible to add new predators, and with the <code>RIGHT</code> mouse button is possible to add new preys.<br>
The infographic on the left side shows how many preys and predator are still alive.
<h2>Reference</h2>
<a href="https://github.com/Hopson97/PredatorAndPrey">Predator & Prey Model</a> by <a href="https://github.com/Hopson97">Matthew Hopson</a>
# addons
 1. add grass
