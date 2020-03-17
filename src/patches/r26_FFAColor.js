(function() {

    eval(onecup["import"]());

    quickScorePlayer = function(player) {
        if (player.side === "dead") {
            return;
        }
        return tr(function() {
            td(function() {
                text_align("left");
                return ui.playerChip(player);
            });
            td(function() {
                return text(findRank(player.name));
            });
            td(function() {
                var ref;
                return text((ref = player.apm) != null ? ref.toFixed(2) : void 0);
            });
            td(function() {
                return text(player.capps);
            });
            td(function() {
                return text(player.unitsBuilt);
            });
            return td(function() {
                return text(player.money);
            });
        });
    };

    ui.topPlayers = function() {
        var maybeChars, quarterWidth, s, team;
        quarterWidth = window.innerWidth / 4;
        maybeChars = quarterWidth / 16;
        team = function(side) {
            var _, cut, i, j, len, len1, p, player, players, results, totalChars;
            players = (function() {
                var ref, results;
                ref = intp.players;
                results = [];
                for (_ in ref) {
                    p = ref[_];
                    if ((p != null ? p.side : void 0) && p.side === side || !side && p.side && p.side !== "spectators") {
                        results.push(p);
                    }
                }
                return results;
            })();
            if (players.length === 0) {
                return span(function() {
                    color("rgba(255,255,255,.6)");
                    return text("no one");
                });
            } else {
                cut = 18;
                while (cut > 1) {
                    totalChars = 0;
                    for (i = 0, len = players.length; i < len; i++) {
                        p = players[i];
                        totalChars += 4;
                        if (p.faction) {
                            totalChars += p.faction.length;
                        }
                        totalChars += p.name.slice(0, cut).length;
                    }
                    if (totalChars > maybeChars) {
                        cut -= 1;
                    } else {
                        break;
                    }
                }
                results = [];
                for (j = 0, len1 = players.length; j < len1; j++) {
                    player = players[j];
                    ui.playerChip(player, cut);
                    results.push(text(" "));
                }
                return results;
            }
        };
        if (sim.serverType === "FFA") {
            return div(function() {
                position("absolute");
                left(quarterWidth);
                return div(function() {
                    position("relative");
                    top(0);
                    left("-50%");
                    return team();
                });
            });
        } else {
            s = 20;
            div(function() {
                position("absolute");
                top(0);
                left(quarterWidth - s);
                width(s * 2);
                return text("vs");
            });
            div(function() {
                position("absolute");
                top(0);
                right(quarterWidth + s);
                return team("alpha");
            });
            return div(function() {
                position("absolute");
                top(0);
                left(quarterWidth + s);
                return team("beta");
            });
        }
    };

    battleroom.quickscore = function() {
        return div(function() {
            var quarterWidth;
            quarterWidth = window.innerWidth / 4;
            position("absolute");
            left(quarterWidth);
            width(quarterWidth * 2);
            top(64);
            bottom(84);
            overflow_y("scroll");
            background_color("rgba(0, 0, 0, .1)");
            color("white");
            if (battleMode.server) {
                div(function() {
                    background_color("rgba(0,0,0,.25)");
                    padding(20);
                    text_align("center");
                    font_size(18);
                    text(battleMode.server.name);
                    text(" ");
                    return text(intp.serverType);
                });
            }
            div(function() {
                var teamTable;
                padding(20);
                teamTable = function(team) {
                    return table(function() {
                        var _, player, ref, results;
                        padding_top(50);
                        tr(function() {
                            height(30);
                            th(function() {
                                width(400);
                                text_align("left");
                                text_align("left");
                                text(team || "name");
                                if (intp.winningSide === team) {
                                    return text("(won)");
                                }
                            });
                            th(function() {
                                width(100);
                                return text("Rank");
                            });
                            th(function() {
                                width(100);
                                return text("APM");
                            });
                            th(function() {
                                width(100);
                                return text("Caps");
                            });
                            th(function() {
                                width(100);
                                return text("Units");
                            });
                            return th(function() {
                                width(100);
                                return text("Money");
                            });
                        });
                        ref = intp.players;
                        results = [];
                        for (_ in ref) {
                            player = ref[_];
                            if (player.side && player.side === team || !team && player.side && player.side !== "spectators") {
                                results.push(quickScorePlayer(player));
                            } else {
                                results.push(void 0);
                            }
                        }
                        return results;
                    });
                };
                if (sim.serverType === "FFA") {
                    return teamTable();
                } else {
                    teamTable("alpha");
                    return teamTable("beta");
                }
            });
            if (intp.winningSide) {
                if (sim.serverType !== "Survival") {
                    bottom(84);
                    div(function() {
                        font_size(90);
                        padding(10);
                        text_align("center");
                        text_shadow("0px 0px 5px #000");
                        return text(intp.winningSide + " victory!");
                    });
                } else if (sim.serverType === "Survival") {
                    bottom(84);
                    div(function() {
                        font_size(90);
                        padding(10);
                        text_align("center");
                        text_shadow("0px 0px 5px #000");
                        return text("The survivors survived " + sim.waveNum + " waves!");
                    });
                }
            }
            if (intp.state === "running" && commander.side !== "spectators") {
                return div(".hover-red", function() {
                    padding(10);
                    width(200);
                    margin("0px auto");
                    text("Surrender");
                    text_align("center");
                    return onclick(function() {
                        return network.send("surrender");
                    });
                });
            } else {
                return div(".hover-black-dark", function() {
                    padding(10);
                    width(200);
                    margin("0px auto");
                    text("Battleroom");
                    text_align("center");
                    return onclick(function() {
                        return ui.mode = "battleroom";
                    });
                });
            }
        });
    };

    sideColor = function(side) {
        var color, mySide, player;
        player = sim.players.find(function(p) {
            return p.name === side;
        });
        if (player != null) {
            return player.color;
        }
        mySide = typeof commander !== "undefined" && commander !== null ? commander.side : void 0;
        if (mySide === side) {
            color = [230, 230, 230, 255];
        } else {
            color = [20, 20, 20, 255];
        }
        return color;
    };

    anitSideColor = function(side) {
        var color, mySide;
        mySide = typeof commander !== "undefined" && commander !== null ? commander.side : void 0;
        if (mySide === "spectators") {
            mySide = "alpha";
        }
        if (mySide !== side) {
            color = [230, 230, 230, 255];
        } else {
            color = [20, 20, 20, 255];
        }
        return color;
    };

    types.CommandPoint.prototype.draw = function() {
        var color, i, j, ref, results, th, x, y;
        if (sim.theme) {
            color = sideColor(this.side);
            baseAtlas.drawSprite(this.image, this.pos, this.size, this.rot, color);
            if (this.capping > 0) {
                color = anitSideColor(this.side);
                results = [];
                for (i = j = 0, ref = this.maxCapp; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                    if (this.capping < i) {
                        break;
                    }
                    th = (i / this.maxCapp) * 2 * Math.PI;
                    x = this.pos[0] + Math.sin(th) * (this.radius + 50);
                    y = this.pos[1] + Math.cos(th) * (this.radius + 50);
                    results.push(baseAtlas.drawSprite(this.sliceImage, [x, y], [1, 1], Math.PI - th, color));
                }
                return results;
            }
        }
    };

    types.SpawnPoint.prototype.draw = function() {
        var color, i, j, max, ref, results, th, to, x, y;
        if (!sim.theme) {
            return;
        }
        color = sideColor(this.side);
        max = 20;
        to = ((sim.step - 8) / (16 * 2)) * 20;
        results = [];
        for (i = j = 0, ref = max; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            if (to < i) {
                break;
            }
            th = (i / max) * 2 * Math.PI;
            x = this.pos[0] + Math.sin(th) * (this.radius + 50);
            y = this.pos[1] + Math.cos(th) * (this.radius + 50);
            results.push(baseAtlas.drawSprite(this.sliceImage, [x, y], [1, 1], Math.PI / 2 - th, color));
        }
        return results;
    };

}).call(this);