// based on http://www.lessmilk.com/tutorial/2d-platformer-phaser
var mainState = {
    preload: function () {
        game.load.crossOrigin = 'anonymous';

        game.load.image('player', '../static/assets/character.png');
        game.load.image('wall', '../static/assets/wall2.png');
        game.load.image('coin', '../static/assets/coinv2.png');
        game.load.image('teleport', '../static/assets/teleport.png');
        game.load.image('door', '../static/assets/door.png');
    },

    create: function () {
        game.stage.backgroundColor = '#6ae4ff';
        game.world.setBounds(0, 0, 1920, 1920);

        game.physics.startSystem(Phaser.Physics.P2JS);


        game.world.enableBody = true;


        this.player = game.add.sprite(190, 100, 'player');
        game.camera.follow(this.player);
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 300,
            jumpStrength: 900,
            gravity: 1300
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.teleports = game.add.group();
        this.doors = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!  o                 x',
            '!           o        x',
            '!       o       o    x',
            '! o                  x',
            'xxxxxxxxxxxxxxxxxxxxxx'
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
        coin.kill();
    },

    transfer: function () {
        game.state.start('tree');
    }
};
var treeState = {
    preload: function () {
        game.load.crossOrigin = 'anonymous';

        game.load.image('player', '../assets/character.png');
        game.load.image('wall', '../static/assets/wall2.png');
        game.load.image('coin', '../static/assets/coinv2.png');
        game.load.image('teleport', '../static/assets/teleport.png');
        game.load.image('door', '../static/assets/door.png');
    },

    create: function () {
        game.stage.backgroundColor = '#6ae4ff';
        game.world.setBounds(0, 0, 1920, 5000);

        game.physics.startSystem(Phaser.Physics.P2JS);


        game.world.enableBody = true;


        this.player = game.add.sprite(190, 100, 'player');
        game.camera.follow(this.player);
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 300,
            jumpStrength: 900,
            gravity: 1300
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.teleports = game.add.group();
        this.doors = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!                    x',
            '!                    x',
            '!                    x',
            '!                    x',
            'xxxxxxxxxxxxxxxxxxxxxx'
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
