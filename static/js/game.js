// based on http://www.lessmilk.com/tutorial/2d-platformer-phaser

var score = 0;
var scoreText;
var mainState = {
    preload: function () {


        game.load.image('player', 'assets/fox.png');
        game.load.image('wall', 'assets/wall2.png');
        game.load.image('coin', 'assets/coinv2.png');
        game.load.image('teleport', 'assets/teleport.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('question', 'assets/question.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('tree', 'assets/treeSmall.png');
    },

    create: function () {
        scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0, 0, 5000, 5000);

        game.physics.startSystem(Phaser.Physics.P2JS);


        game.world.enableBody = true;


        this.player = game.add.sprite(190, 100, 'player');
        game.camera.follow(this.player);
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 500,
            jumpStrength: 900,
            gravity: 1000
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.teleports = game.add.group();
        this.questions = game.add.group();
        this.grasses = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!  o                                         x',
            '!           o                  pppp          x',
            '!       o       o                            x',
            '! o                                          x',
            '! o  ppp               q                     x',
            '! o                   pppp           ppp     x',
            '! o                                          x',
            '! o         q                                x',
            '! o        pppp                              x',
            '! o                    q       ppppp         x',
            '! o                  pppp                    x',
            '! o                                          x',
            '! o               q                          x',
            '! o             pppp                         x',
            '! o                                  pppp    x',
            '! o  ppp                    q                x',
            '! o                        ppp               x',
            '! o                  q                       x',
            '! o          ppppppppppp                     x',
            '! o                                          x',
            '! o                                          x',
            '! o      ppppp                     pppp      x',
            '! o                                          x',
            '! o                                          x',
            'pppppppppppppppppppppppppppppppppppppppppppppp'
        ];

        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'coin');
                    this.coins.add(coin);
                } else if (level[i][j] === '!') {
                    var teleport = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'teleport');
                    this.teleports.add(teleport);
                } else if (level[i][j] === 'q') {
                    var question = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'question');
                    this.questions.add(question);
                } else if (level[i][j] === 'p') {
                    var grass = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'grass');
                    this.grasses.add(grass);
                    grass.body.immovable = true;
                }

            }
        }

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        })
        ;
        this.player.behaviors.set('collide-on-grass', Phaser.Behavior.CollisionHandler, {
            targets: this.grasses
        })
        ;

        this.player.behaviors.set('collide-on-teleport', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.teleports,
            collideCallback: this.transfer
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
        this.player.behaviors.set('collect-question', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.questions,
            collideCallback: this.getQuestion
        });
    },
    getQuestion: function (player, question) {
        question.kill();
        window.open('demographics.html', '_blank');
    },


    takeCoin: function (player, coin) {
        score += 1;
        scoreText.text = 'Score: ' + score;
        coin.kill();
    },

    transfer: function () {
        game.state.start('tree');
    },


};
var treeState = {
    preload: function () {
        game.load.image('player', '../static/assets/character.png');
        game.load.image('wall', '../static/assets/wall2.png');
        game.load.image('coin', '../static/assets/coinv2.png');
        game.load.image('teleport', '../static/assets/teleport.png');
        game.load.image('door', '../static/assets/door.png');
        game.load.image('question', '../static/assets/question.png');
        game.load.image('tree', 'assets/treeSmall.png');
        game.load.image('tree1', 'assets/midTree.png');
        game.load.image('tree2', 'assets/treeBig.png');
    },

    create: function () {
        scoreText = game.add.text(16, 16, 'score:' + score, {fontSize: '32px', fill: '#000'});
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0, 0, 5000, 5000);

        game.physics.startSystem(Phaser.Physics.P2JS);


        game.world.enableBody = true;


        this.player = game.add.sprite(190, 100, 'player');
        game.camera.follow(this.player);
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 500,
            jumpStrength: 900,
            gravity: 1000
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.teleports = game.add.group();
        this.doors = game.add.group();
        this.trees = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxx',
            '!               x',
            '!               x',
            '!         t     x',
            '!               x',
            '!               x',
            '!               x',
            'xxxxxxxxxxxxxxxxx'
        ];

        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'coin');
                    this.coins.add(coin);
                } else if (level[i][j] === '!') {
                    var teleport = game.add.sprite(64 + 66 * j, 64 + 66 * i, 'teleport');
                    this.teleports.add(teleport);
                } else if (level[i][j] === '*') {
                    var door = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'door');
                    this.doors.add(door);
                } else if (level[i][j] === 't') {
                    if (score < 4) var tree = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'tree');
                    if (score > 3 && score <= 7) var tree = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'tree1');
                    if (score > 7) var tree = game.add.sprite(64 + 66 * j, 32 + 66 * i, 'tree2');
                    behaviorPlugin.enable(tree);
                    tree.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
                        targets: this.walls
                    });
                    tree.behaviors.set('tree', Phaser.Behavior.Platformer, {
                        velocity: 0,
                        jumpStrength: 0,
                        gravity: 1000000
                    });
                    this.trees.add(tree);
                }
            }
        }

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        });

        this.player.behaviors.set('collide-on-teleport', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.teleports,
            collideCallback: this.transfer
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
    },

    takeCoin: function (player, coin) {
        score += 1;
        scoreText.text = 'Score: ' + score;
        coin.kill();
    },

    transfer: function () {
        game.state.start('main');
    }
};

var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS),
    behaviorPlugin;
game.state.add('main', mainState);
game.state.add('tree', treeState);
game.state.start('main');
