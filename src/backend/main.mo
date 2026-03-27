import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type Status = {
    #released;
    #inDevelopment;
    #comingSoon;
  };

  type Game = {
    id : Text;
    title : Text;
    description : Text;
    genre : Text;
    status : Status;
    year : Nat;
    link : ?Text;
    players : Text;
  };

  module Game {
    public func compare(game1 : Game, game2 : Game) : Order.Order {
      Text.compare(game1.id, game2.id);
    };
  };

  let games = [
    {
      id = "1";
      title = "Shadow Strike OP";
      description = "Intense third-person tactical shooter where you strike from the shadows. Outmaneuver enemies with stealth and precision combat.";
      genre = "Action / Battle";
      status = #released;
      year = 2024;
      link = null;
      players = "3rd Person";
    },
    {
      id = "2";
      title = "Warzone Legends";
      description = "Epic large-scale battlefield warfare. Command legendary warriors through explosive combat zones and dominate every warzone.";
      genre = "Action / Battle";
      status = #released;
      year = 2024;
      link = null;
      players = "3rd Person";
    },
    {
      id = "3";
      title = "Elite Ops: FireStorm";
      description = "Elite special forces operation under a firestorm. Deploy tactical gear, breach objectives, and eliminate high-value targets.";
      genre = "Action / Battle";
      status = #released;
      year = 2024;
      link = null;
      players = "3rd Person";
    },
    {
      id = "4";
      title = "Phantom Battle X";
      description = "Ghost-team warfare with cutting-edge tech. Become a phantom operative and vanish before enemies even see you coming.";
      genre = "Action / Battle";
      status = #inDevelopment;
      year = 2025;
      link = null;
      players = "3rd Person";
    },
    {
      id = "5";
      title = "Sniper Fury OP";
      description = "Long-range precision combat across dangerous global hotspots. One shot, one kill — feel the fury of the perfect sniper.";
      genre = "Action / Battle";
      status = #released;
      year = 2024;
      link = null;
      players = "3rd Person";
    },
    {
      id = "6";
      title = "Last Survivor OP";
      description = "Brutal survival showdown — only the strongest make it out. Scavenge, build, and fight to be the last one standing.";
      genre = "Survival / Battle";
      status = #released;
      year = 2023;
      link = null;
      players = "3rd Person";
    },
    {
      id = "7";
      title = "DeadZone Royale";
      description = "Toxic deadzone shrinks the battlefield. Drop in, loot fast, and outlast all rivals in this high-stakes battle royale.";
      genre = "Survival / Battle";
      status = #released;
      year = 2024;
      link = null;
      players = "3rd Person";
    },
    {
      id = "8";
      title = "Survival King X";
      description = "Harsh wilderness survival meets fierce PvP combat. Craft, hunt, and battle your way to claim the Survival King title.";
      genre = "Survival / Battle";
      status = #inDevelopment;
      year = 2025;
      link = null;
      players = "3rd Person";
    },
    {
      id = "9";
      title = "BattleGround Fury";
      description = "Adrenaline-fueled battleground chaos with non-stop action. Rage across massive arenas in the ultimate fury of war.";
      genre = "Survival / Battle";
      status = #comingSoon;
      year = 2025;
      link = null;
      players = "3rd Person";
    },
  ];

  public query ({ caller }) func getGames() : async [Game] {
    games.sort();
  };
};
