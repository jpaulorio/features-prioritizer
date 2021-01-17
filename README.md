# features-prioritizer
Makes feature prioritization easy

Create features and dimensions then prioritize features by assigning them values for each dimension. The higher the dimension the more it weighs when computing the feature priority.

# Dependencies

install npm or yarn

# Run

npm run start

or

yarn start

# How it works

Add/remove dimensions and features then change the value of the dimensions
for each feature by dragging the sliders.

Change the priority of the dimensions by repositioning them via drag'n drop.

# Known issues

1. None that I'm aware of but probably many. :)

# Roadmap

1. Add custom weights to dimensions.
2. Allow for concurrent editing by multiple users.
3. For concurrent editing, allow for a private mode so users don't see each other's changes until they're applied.
4. Plot 2-D charts for each pair of dimensions (e.g.: 3 dimensions = 3 charts, 4 dimensions = 6 charts).
5. Write tests.
6. Refactor code.
7. Make it prettier!

# See it live

[Prod Environment](https://features-prioritizer.herokuapp.com/)
