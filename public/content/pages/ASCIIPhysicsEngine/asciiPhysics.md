In 2018, I became interested in a challenge: would it be possible to run some kind of browser game on a Kindle eReader?

The main limitation, besides the limited screen space and even more limited browser and refresh rate, is one of support: the kindle doesn't support anything more modern than HTML 4. Therefore, I couldn't use any kind of modern web technology, including the HTML5 `<canvas>` element.

## The Renderer

Therefore, I started by building the basics of the engine, the renderer. In initial versions, this used a simple buffering system that updated the screen every frame, but I later realized that this was too slow and moved to a more advanced version that checked whether the game state changed and only updated the screen when it did.

Everything on the screen was some kind of shape, whether that shape was a simple rectangle or a more complex bitmap (such as a character).

Outline (TODO finish updating this):

- Overview - render loop, setup
- Physical properties (physics sim trying to simulate), and how they are calculated
  - Weight
  - Torque
  - Rotations/Transformations
- Meshing and vertex tables
- Mapping 3d object to 2d screen
- Text engine
- Color engine
- Vector and angle display
- Primitives
  - Vectors and vector operations
  - Points and point operations
- Optimization
- Z-buffer and rendering order
- Collision checking

```js
this.coefficients = {
  drag: 0.47,
  staticFrictionCutoff: 0.3, //great table at https://www.school-for-champions.com/science/friction_sliding_coefficient.htm
  kineticFriction: 0.48, //we will assume that the materials are oak on oak wood
  rollingFriction: 0.002,
  angularDamping: -1,
  mu: 2, //friction
  J: -1,
};
this.rotation = {
  alpha: 0, //angular acceleration
  omega: 0, //angular velocity
  theta: 0, //rotation in radians
};
```

## The Physics

For the physics portion, I also used a relatively simple system that kept track of each shape's velocity and could add to it using physical forces like gravity, drag, or a reaction force to any collision. This worked well enough for simple games, but for later versions a lot of hacks had to be put in place for the collision to work right.

## Platformed

Once the renderer and physics were done, I created a game I christened "Platformed" for its simple nature: jump your way to the portal in each level without hitting any of the obstacles, which would reset the level.

![Title screen, version 1 renderer](titleScreen.jpg)

In more advanced versions, I later added color rendering:

![Title screen, color renderer](titleScreenColor.png)

which also made their way into the levels:

![Level 3 sample, in color](level3.png)

# Conclusion

Overall, this project was an excellent way to learn more about Javascript and building advanced games with simple hardware! Although I did end up testing it on the kindle, the framerate made it almost impossible to play.

```

```
