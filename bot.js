var Discord = require('discord.io');
var logger = require('winston');
var creatorid = '371314406782402590';
var servers = [];
var sta = [];
var unclaimed = [];
var claimed = [];
var cooking = [];
var listening = false;
var listeningid = '0';
var listeningmode = 'cmd';
var listentrigger = "hey burgerbot";
var cooked = [];
var inctrl = false;

var blacklist = ['1'];

var infolist = ['Say *help!','*order', '*', 'd-bbot.glitch.me']

function getaordernum() {
return unclaimed.length + claimed.length + cooking.length + cooked.length;
}

var tos = `

${tc}
By ordering, you agree to:
-follow the rules
-never spam orders for any reason
-not complain about the order making time

By inviting the bot to a server, you agree to:
-have the bot go offline at any moment
-have your order reset because of going offline
-the owner of the bot join your server at any time
${tc}

`;

function lis(stfi,stf) {
if (stfi.toLowerCase().contains(stf)) {
return true;
} else {
return false;
}
}
var found = false;
var fa=[];
var kitchenid = '533699055684157460';
var deliveryid = '533699069122707464';
var complaintsid = '533924446805688331';
var creatorid = '371314406782402590';
var invitelink = `https://discordapp.com/oauth2/authorize?client_id=531826571623792655&scope=bot&permissions=8`;
var serverlink = `https://discord.gg/4gRR6NP`;
var verlinkr = `https://www.roblox.com/games/2672916224/Verification`;
var censor = ["bitch","shit","faggot","nigga","nigger","sex","erect","cum","ass","ejaculat","dick","fap"];
var onc = false;
var inctrl = false;
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
var sc = "`";
var tc = "```";
var giveawayon = false;
var gmid = "";
function rep(text,s,r) {
return text.replace(s,r);
}

function genid() {
chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var generated = "";
for (i = 0; i < 6; i++) { 
  generated = generated + chars[Math.floor(Math.random() * chars.length)];
}
return generated;
}

function caesar (text, shift) {
  return text.toUpperCase().replace(/[^A-Z]/g,'').replace(/./g, function(a) {
    return String.fromCharCode(65+(a.charCodeAt(0)-65+shift)%26);
  });
}
var cmdlist = `

Available to everyone:

*order [order here]: Orders with a random order ID and [order here] becoming the order.
*order oid=[order id here] [order here]: Orders with [order id here] being the order ID and [order here] becoming the order.
*order [order here] (serveindm): Orders with a random order ID and [order here] becoming the order, but delivers the order in Direct Messages, instead of the channel it was ordered in.
You can mix *order commands, for example: *order oid=cookmeh Cheeseburger (serveindm)

[NOTE: *order cannot be used if you already have an order pending, if there are 35 orders (the max limit of orders), or if you are blacklisted from the service.]

*myorder: shows the info of your order, if you have an order pending.
*delorder [without order id]: deletes whatever you ordered.
*help: Displays this.
*invite: Displays the invite link for the bot.
*server: Displays the invite link for the official server.
*bruh: bruh

Worker only:

*olist: gets the list of orders currently pending.
*oinfo [order id]: gets the info of a order that has [order id] as its order ID.
*delorder [order id]: deletes any order that has [order id] as its order ID.
*claim [order id]: claims an order that has [order id] as its order ID, so that no one else than you can prepare it. [Lasts only for 5 minutes]

Chef only:

*cook [order id] [img link]: cooks the order you have claimed as [img link] as the link for the image.

[NOTE: Don't put a image in [img link]. At most, paste the image into the chat, copy the image's link, and then run the command.]

Delivery only:

*deliver [order id]: delivers an order that has [order id] as its order ID.



`;

var acttest = false;
var actsid = '0';
var actrate = 0;
var actscore = 0;

var rules = `

Allowed:white_check_mark::

Swear words
Transparent burgers
Bleach [no other poison]

Disallowed:negative_squared_cross_mark::

Orders that are not burgers
Orders with 5+ items
Insulting people with swear words
Communism
NSFW
Flesh [body parts, etc]
Fully invisible burgers
Poison that is not bleach

`;
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  sta = [`${guild.name}`,`${guild.id}`]
  servers.push(sta);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  function remserv(item, index) {
	if (item == [`${guild.name}`, `${guild.id}`]) {
  		if (index > -1) {
  			servers.splice(index, 1);
		}
	}
  }
  servers.forEach(remserv)

});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    var gamename = infolist[Math.floor(Math.random()*infolist.length)];
    var scount = servers.length;
bot.setPresence({
		game: {
			name: gamename + " | In " + scount.toString() + " servers",
		}    
});
setInterval(function() {

var gamename = infolist[Math.floor(Math.random()*infolist.length)];
var scount = servers.length;

bot.setPresence({
		game: {

			name: gamename + " | In " + scount.toString() + " servers",
		}    
});

},60000)
    
});

function say(text,ci) {
bot.sendMessage({
to:ci,
message: text
});
}



if (acttest == true && actsid == serverID) {
actrate = actrate + 1;
if (actrate == 3) {
actrate = 0;
actscore = actscore + 1;
}
}




var promiseditem = "";
var returnedpromise = false;

function checkc(item,index) {
if (promiseditem.toLowerCase().contains(item.toLowerCase()) == true) {
returnedpromise = true;	
}
}
var lmid = "";
var lbmid = "";
bot.on('message', function (user, userID, channelID, message, evt) {
if (userID == creatorid) {
if (inctrl == true) {
if (message.charAt(0) != "*") {
var mts = message;
bot.deleteMessage({
channelID: channelID,
messageID: evt.d.id
});
say(mts, channelID);

return;
}
}
}








	lmid = evt.d.id;
	if (userID == bot.id) {
	lbmid = lmid;
	return;
	}
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	if (onc == true) {
	promiseditem = message;
	returnedpromise = false;
	censor.forEach(checkc);
	if (returnedpromise == true) {
	returnedpromise = false;
	bot.deleteMessage({
        channelID: channelID,
	messageID: message.id},
        function (err) {
            console.log(err)
          });
	}
	}
    if (message.substring(0, 1) == '*') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		if (channelID == userID) {
			say('Sorry, but you cannot use commands in Direct Messages.', channelID);
			return;
		}
var blf = false;
var i;
for (i=0; i < blacklist.length; i++) {
if (blacklist[i] == userID) {
blf = true;
}
}

if (cmd != "help" && cmd != "rules" && cmd != "tos" && cmd != "invite" && cmd != "server" && blf == true) {
say(':negative_squared_cross_mark: You are blacklisted from our service, and you cannot use any commands other than `help`, `rules`, `tos`, `invite`, `server`.', channelID);
return;
}
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
		console.log('got ping');
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
	    
            break;
case 'rules':
say(rules, userID);
say(':white_check_mark: <@' + userID + '> Check your DMs!', channelID);


break;

case 'order':

if (args[0] == null || args[0] == undefined) {
return;
}

var found=false;
var fa=[];
for (var i = 0; i < unclaimed.length; i++) {
if (unclaimed[i][2] && unclaimed[i][2] == userID) {
found=true;
fa=unclaimed[i];
break;
}
}

if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (unclaimed[i][2] && unclaimed[i][2] == userID) {
found=true;
fa=claimed[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooking.length; i++) {
if (unclaimed[i][2] && unclaimed[i][2] == userID) {
found=true;
fa=cooking[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (unclaimed[i][2] && unclaimed[i][2] == userID) {
found=true;
fa=cooked[i];
break;
}
}
}

if (found == false) {

var sts = "";
for (index = args.length - 1; index >= 0; --index) {
    console.log(args[args.length - index - 1]);
    sts = sts + args[args.length - index - 1] + " ";
}
sts = sts.replace("@here","@.here");
sts = sts.replace("@everyone", "@.everyone");

var itu = genid();



if (args[0].substring(0,4) == "oid=") {
console.log('found lol');

args[0] = args[0].substring(4);
console.log('got lol');
itu = args[0];
console.log('set lol');
args.shift();
console.log('hid lol');

var sts = "";
for (index = args.length - 1; index >= 0; --index) {
    console.log(args[args.length - index - 1]);
    sts = sts + args[args.length - index - 1] + " ";
}
sts = sts.replace("@here","@.here");
sts = sts.replace("@everyone", "@.everyone");

}

var dic = channelID;

if (args[args.length - 1] == "(serveindm)") {

dic = userID;
args.pop();
var sts = "";
for (index = args.length - 1; index >= 0; --index) {
    console.log(args[args.length - index - 1]);
    sts = sts + args[args.length - index - 1] + " ";
}
sts = sts.replace("@here","@.here");
sts = sts.replace("@everyone", "@.everyone");

}


unclaimed.unshift([itu, sts, userID, "nobody"]);

if (getaordernum() > 34) {

say(':negative_squared_cross_mark: Sorry, but the system has hit the max order limit of 35 orders per time. Please wait until the orders lower down.', channelID);

return;
} else {
say('Attempting to place your order...', channelID);





say(':white_check_mark: Your order has been placed as `'+itu+'`. Further information and the served food will be delivered in DMs.', channelID);
say(`New order:
${sc}${itu}${sc}
Details: ${sts}
Ordered by: <@${userID}>
`, kitchenid);
}
} else {

say(':negative_squared_cross_mark: Sorry, but you already have an order pending. Please wait patiently until your previous order gets deleted or delivered.', channelID);	
	
}






break;

case 'myorder':

var found=false;
var fa=[];
for (var i = 0; i < unclaimed.length; i++) {
if (unclaimed[i][2] == userID) {
found=true;
fa=unclaimed[i];
break;
}
}

if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (unclaimed[i][2] == userID) {
found=true;
fa=claimed[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooking.length; i++) {
if (unclaimed[i][2] == userID) {
found=true;
fa=cooking[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (unclaimed[i][2] == userID) {
found=true;
fa=cooked[i];
break;
}
}
}

if (found == true) {

if (fa[3] != "nobody") {
addit = `Claimed by: <@${fa[3]}> [UserID: ${fa[3]}]`
}
say(`Here's the order info:

Order ID: ${fa[0]}

Order: ${fa[1]}

Ordered by: <@${fa[2]}> [UserID: ${fa[2]}]

${addit}

`,channelID);
	
} else {

say(`:negative_squared_cross_mark: You don't have an order pending!`, channelID);
	
}

break;

case 'olist':

if (channelID == kitchenid || channelID == deliveryid) {
// good
} else {
say('You can only run this command in #kitchen or #delivery in the Official Discord Burgers server.', channelID);
return;
}

var tunc = "";
var tcla = "";
var tcki = "";
var tckd = "";

for (var i = 0; i < unclaimed.length; i++) {
    tunc = tunc + '`'+unclaimed[i][0]+'`; '
}

for (var i = 0; i < claimed.length; i++) {
    tcla = tcla + '`'+claimed[i][0]+'`; '
}

for (var i = 0; i < cooking.length; i++) {
    tcki = tcki + '`'+cooking[i][0]+'`; '
}

for (var i = 0; i < cooked.length; i++) {
    tckd = tckd + '`'+cooked[i][0]+'`; '
}



say(`

Unclaimed: ${tunc}
Claimed: ${tcla}
Cooking: ${tcki}
Cooked: ${tckd}

`, channelID);


break;

case 'help':

say(cmdlist, userID);
say(':white_check_mark: <@' + userID + '> Check your DMs!', channelID);

break;

case 'invite':


say(`

${invitelink}

Thank you for choosing BurgerBot! :)
`, userID);
say(':white_check_mark: <@' + userID + '> Check your DMs!', channelID);


break;

case 'oinfo':

if (channelID == kitchenid || channelID == deliveryid) {
// good
} else {
say('You can only run this command in #kitchen or #delivery in the Official Discord Burgers server.', channelID);
return;
}

if (args[0]) {
var found=false;
var fa=[];
for (var i = 0; i < unclaimed.length; i++) {
if (unclaimed[i][0] == args[0]) {
found=true;
fa=unclaimed[i];
break;
}
}

if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (claimed[i][0] == args[0]) {
found=true;
fa=claimed[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooking.length; i++) {
if (cooking[i][0] == args[0]) {
found=true;
fa=cooking[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (cooked[i][0] == args[0]) {
found=true;
fa=cooked[i];
break;
}
}
}







if (found == false) {

say('That order does not exist. Remember, order IDs are CaSe SeNsItIvE!', channelID);
return;

}

var addit="";

if (fa[3] != "nobody") {
addit = `Claimed by: <@${fa[3]}> [UserID: ${fa[3]}]`
}
say(`Here's the order info:

Order ID: ${fa[0]}

Order: ${fa[1]}

Ordered by: <@${fa[2]}> [UserID: ${fa[2]}]

${addit}

`,channelID);

} else {
say('Please provide a valid order ID!',channelID);
}

break;

case 'claim':

if (channelID == kitchenid || channelID == deliveryid) {
// good
} else {
say('You can only run this command in #kitchen or #delivery in the Official Discord Burgers server.', channelID);
return;
}

var asdtemp0 = 0;

if (args[0]) {
var found=false;
var fa=[];
for (var i = 0; i < unclaimed.length; i++) {
if (unclaimed[i][0] == args[0]) {
found=true;
asdtemp0 = i;
fa=unclaimed[i];
break;
}
}

if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (claimed[i][0] == args[0]) {
found=true;
asdtemp0 = i;
fa=claimed[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooking.length; i++) {
if (cooking[i][0] == args[0]) {
found=true;
asdtemp0 = i;
fa=cooking[i];
break;
}
}
}


if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (cooked[i][0] == args[0]) {
found=true;
asdtemp0 = i;
fa=cooked[i];
break;
}
}
}







if (found == false) {

say('That order does not exist. Remember, order IDs are CaSe SeNsItIvE!', channelID);
return;

}

var addit="";

if (fa[3] == "nobody") {

fa[3] = userID;
claimed.unshift(fa);
unclaimed.splice(asdtemp0);


say('You have successfully claimed order `'+fa[0]+'`. You have 5 minutes to *cook it* or it gets unclaimed.', channelID);
say(`It appears that chef <@${fa[3]}> has claimed your order. It should be cooking soon. If it doesn't get put into the oven in 5 minutes, anyone can reclaim it.`, fa[2]);
setTimeout(function() {

found = false;
if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (claimed[i][0] == args[0]) {
found = true;
break;
}
}
}

if (found == true) {

say('Order `'+fa[0]+'` has been unclaimed. Someone claim it!', kitchenid);
say(`Chef <@${fa[3]}> has waited too long on your order. It's now unclaimed, anyone can reclaim it.`, fa[2]);
fa[3] = "nobody";

}



}, 1000*60*5)


} else {
	
say(`Chef <@${fa[3]}> has already claimed this order!`, channelID);
	
}

} else {
say('Please provide a valid order ID!', channelID);
}


break;

case 'cook':

if (channelID == kitchenid) {
// good
} else {
say('You can only run this command in #kitchen in the Official Discord Burgers server.', channelID);
return;
}


console.log("said in kitchen");

if (args[0]) {
console.log('id found');
	var found = false;
	var asdtemp = 0;
	fa = [];
	if (found == false) {
console.log('found false');
		for (var i = 0; i < claimed.length; i++) {
console.log('for each order');
			if (claimed[i][0] == args[0]) {
console.log('if order id is the id said');
				found=true;
console.log('slowly');
				fa=claimed[i];
				asdtemp = i;
console.log('i think its done');
			}
		}
	}


	if (found == true) {


console.log('found order!');

		if (fa[3] == userID) {

console.log('order is claimed by cooker');

			if (args[1]) {

console.log('order link found');

				var asdtemp2 = claimed[asdtemp];
				cooking.unshift([asdtemp2[0],asdtemp2[1],asdtemp2[2],asdtemp2[3],args[1]])
console.log('unshifted :)');
				claimed.splice(asdtemp);
				say(`Chef <@${asdtemp2[3]}> has put your order in the oven. It should take about 1 minute.`, asdtemp2[2]);
console.log('commit notify user...setting timeout');
say('Successfully put the order into the oven. Cooking takes about 1 minute.', channelID);
				
setTimeout(function() {
console.log('TIMEOUT ALARM - order cookd');
					var asdtemp2 = cooking[asdtemp];
					cooked.unshift(asdtemp2);
					cooking.splice(asdtemp);
					say('It appears your order `'+asdtemp2[0]+'` has been cooked, and is ready to deliver. Please wait patiently.', asdtemp2[2]);
					say('Order `'+asdtemp2[0]+'` is cooked and ready for delivery!', deliveryid);
				}, 1000*60)
	
			}

		} else {
			say('You cannot cook an order that you have not claimed!', channelID);	
		}
	
	}


}


break;

case 'deliver':


if (channelID == deliveryid) {
// good
} else {
say('You can only run this command in #delivery in the Official Discord Burgers server.', channelID);
return;
}

if (args[0]) {

found = false;
if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (cooked[i][0] == args[0]) {
found=true;
fa=cooked[i];
break;
}
}
}


if (found==true) {

fa[5] = userID;
say(':red_car::dash: The order is on the way!', channelID);
say('Your order `'+fa[0]+'` is on the way! Delivery should take about 1 minute.', fa[2]);
var todeliv = fa;
setTimeout(function() {

say(`Your order has arrived!

If you like the service, you may:
invite the bot to your server [${sc}*invite${sc}]
join the official Discord Burgers server [${sc}*server${sc}]


Details:

Cooker: <@${todeliv[3]}>
Delivery person: <@${todeliv[5]}>
Order ID: ${todeliv[0]}
Order: ${todeliv[1]}

If anything was wrong, please tell us in #complaints and it will be talked out in #solving-complaints!

We hope you will enjoy your burger!
Here it is: ${todeliv[4]}`, todeliv[2]);

}, 1000*60);


} else {
say('That order does not exist, or is not ready for delivery. Remember, order IDs are CaSe SeNsItIvE!', channelID);
}



} else {
say('Please provide a valid order ID!', channelID);
}

break;

case 'server':

say(`

${serverlink}

Thank you for choosing BurgerBot! :)
`, userID);
say(':white_check_mark: <@' + userID + '> Check your DMs!', channelID);

break;
case 'eval':
if(userID != creatorid) {
bot.sendMessage({
to:channelID,
message: ":angry: You are not *the creator*, you cannot run this!"
});
} else {
try {
      var code = "";
for (index = args.length - 1; index >= 0; --index) {
    console.log(args[args.length - index - 1]);
    code = code + args[args.length - index - 1] + " ";
}
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      bot.sendMessage({
to: channelID,
message: `${clean(evaled)}`
});
    } catch (err) {
      bot.sendMessage({
to:channelID,
message:(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
});
    }
}
break;

case 'delorder':

if (args[0]) {

if (channelID == kitchenid || channelID == deliveryid) {
// good
} else {
say('You can only run this command in #kitchen or #delivery in the Official Discord Burgers server if you want to delete others orders.', channelID);
return;
}

found = false;
var fa=[];
var fafa="";
var fafafa = 0;
if (found == false) {
for (var i = 0; i < unclaimed.length; i++) {
if (unclaimed[i][0] == args[0]) {
found = true;
fa=unclaimed[i];
fafa = "unc";
fafafa = i;
break;
}
}
}

if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (claimed[i][0] == args[0]) {
found = true;
fa=claimed[i];
fafa = "cla";
fafafa = i;
break;
}
}
}

if (found == false) {
for (var i = 0; i < cooking.length; i++) {
if (cooking[i][0] == args[0]) {
found = true;
fa=cooking[i];
fafa = "cki";
fafafa = i;
break;
}
}
}

if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (cooked[i][0] == args[0]) {
found = true;
fa=cooked[i];
fafa = "ckd";
fafafa = i;
break;
}
}
}

say('Deleting the order...', channelID);

if (fafa == "unc") {
unclaimed.splice(fafafa);
say('<@' + userID + '> Successfully deleted the order from *unclaimed*.', channelID);
return;
}

if (fafa == "cla") {
claimed.splice(fafafa);
say('<@' + userID + '> Successfully deleted the order from *claimed*.', channelID);
return;
}

if (fafa == "cki") {
cooking.splice(fafafa);
say('<@' + userID + '> Successfully deleted the order from *cooking*.', channelID);
return;
}

if (fafa == "ckd") {
cooked.splice(fafafa);
say('<@' + userID + '> Successfully deleted the order from *cooked*.', channelID);
return;
}

say('<@' + userID + '>, somehow by defying all laws of time and space the order was not found.', channelID);



} else {




found = false;
var fa=[];
var fafa="";
var fafafa = 0;
if (found == false) {
for (var i = 0; i < unclaimed.length; i++) {
if (unclaimed[i][2] == userID) {
found = true;
fa=unclaimed[i];
fafa = "unc";
fafafa = i;
break;
}
}
}

if (found == false) {
for (var i = 0; i < claimed.length; i++) {
if (claimed[i][2] == userID) {
found = true;
fa=claimed[i];
fafa = "cla";
fafafa = i;
break;
}
}
}

if (found == false) {
for (var i = 0; i < cooking.length; i++) {
if (cooking[i][2] == userID) {
found = true;
fa=cooking[i];
fafa = "cki";
fafafa = i;
break;
}
}
}

if (found == false) {
for (var i = 0; i < cooked.length; i++) {
if (cooked[i][2] == userID) {
found = true;
fa=cooked[i];
fafa = "ckd";
fafafa = i;
break;
}
}
}

say('Deleting your order...', channelID);

if (fafa == "unc") {
unclaimed.splice(fafafa);
say('<@' + userID + '> Successfully deleted your order from *unclaimed*.', channelID);
return;
}

if (fafa == "cla") {
claimed.splice(fafafa);
say('<@' + userID + '> Successfully deleted your order from *claimed*.', channelID);
return;
}

if (fafa == "cki") {
cooking.splice(fafafa);
say('<@' + userID + '> Successfully deleted your order from *cooking*.', channelID);
return;
}

if (fafa == "ckd") {
cooked.splice(fafafa);
say('<@' + userID + '> Successfully deleted your order from *cooked*.', channelID);
return;
}




}

break;

case 'control':

if (userID == creatorid) {
if (inctrl == true) {
inctrl = false;
} else {
inctrl = true
}
bot.deleteMessage({
channelID: channelID,
messageID: evt.d.id
});
} else {
say(':angry: You are not *the creator*, you cannot run this!', channelID);
}

break;

case 'bruh':

bot.uploadFile({
	to: channelID,
	file: "./bruh.mp3",
	filename: "bruh.mp3",
	message: ""
});

break;


}
}
});

