/// hack the copy design
///BattleMode.prototype.copySelected = (index) => { if (commander.selection.length === 1) { buildBar.setSpec(index, new types.Unit(commander.selection[0].spec).toSpec()); control.savePlayer(); } };
 
BattleMode.prototype.copySelected = function(index) {
    var copy, spec, unit;
    if (commander.selection.length === 1) {
      unit = commander.selection[0];
      spec = unit.spec;
   
      copy = new types.Unit(spec);
//         copy.aiRules = [];
//         if (!sim.local && window.location.href.indexOf("gamedev.html") === -1 && unit.owner !== commander.number) {
//           copy.ghostCopy = true;
       
//         }
      buildBar.setSpec(index, copy.toSpec());
      console.log(copy.turnSpeed);
      
//         copy = new types.Unit(buildBar[index]);
//         copy.ghostCopy = false;
//         buildBar.setSpec(index, copy.toSpec());


      return control.savePlayer();
    }
  };

//  window.hasIssue = function(player, spec) {
//      return null;
//  }
