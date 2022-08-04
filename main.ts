let emptyObstacleY = 0
let ticks = 0
let hero : game.LedSprite = null
let contador = 0
let obstacles : game.LedSprite[] = []
hero = game.createSprite(0, 2)
hero.set(LedSpriteProperty.Blink, 300)
function movement() {
    if (input.acceleration(Dimension.Y) > 150) {
        hero.change(LedSpriteProperty.Y, 1)
    } else if (input.acceleration(Dimension.Y) < -150) {
        hero.change(LedSpriteProperty.Y, -1)
    }
    
}

basic.forever(function on_forever() {
    
    movement()
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 < 5; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
            }
            
        }
    }
    
    for (let obstacle3 of obstacles) {
        if (obstacle3.get(LedSpriteProperty.X) == hero.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == hero.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
        
    }
    if (contador == 4) {
        game.addScore(1)
        contador = 1
    }
    
    ticks += 1
    contador += 1
    basic.pause(1000)
})
