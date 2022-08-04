
emptyObstacleY = 0
ticks = 0
hero: game.LedSprite = None
contador = 0
obstacles: List[game.LedSprite] = []
hero = game.create_sprite(0, 2)
hero.set(LedSpriteProperty.BLINK, 300)

def movement():
    if input.acceleration(Dimension.Y) > 150:
        hero.change(LedSpriteProperty.Y, 1)
    elif input.acceleration(Dimension.Y) < -150:
        hero.change(LedSpriteProperty.Y, -1)

def on_forever():
    global emptyObstacleY, ticks, contador
    movement()
    while len(obstacles) > 0 and obstacles[0].get(LedSpriteProperty.X) == 0:
        obstacles.remove_at(0).delete()
    for obstacle2 in obstacles:
        obstacle2.change(LedSpriteProperty.X, -1)
    if ticks % 3 == 0:
        emptyObstacleY = randint(0, 4)
        for index2 in range(5):
            if index2 != emptyObstacleY:
                obstacles.append(game.create_sprite(4, index2))
    for obstacle3 in obstacles:
        if obstacle3.get(LedSpriteProperty.X) == hero.get(LedSpriteProperty.X) and obstacle3.get(LedSpriteProperty.Y) == hero.get(LedSpriteProperty.Y):
            game.game_over()
    if contador == 4:
        game.add_score(1)
        contador = 1
    ticks += 1
    contador+=1
    basic.pause(1000)
basic.forever(on_forever)