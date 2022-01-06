const { MessageEmbed } = require('discord.js');
var def = require('./stat-getters/default');
var help = require('../support/help');

/************************************************** */
/**
 * The main function
 * @param {discord message} message 
 * @param {arguments, args[0] is a nickname} args 
 */

async function execute(message, args) {
    let username = args[0]
          
    switch(username){
        case undefined:
            help.execute(message);
            break;

        default:
            const player = await def.findPlayer(username);

            if (player.length==0){
                var embedMsg = new MessageEmbed()
                .setColor('RED')
                .setDescription("**"+username+ "** does not exist")
                message.reply({embeds:[embedMsg]}); 
                break;
            }

            var getPlayerStats = await def.getSeasonalCasualStats(player[0]);
            
            if (getPlayerStats.description == 'This player does not have any stats'){
                await message.reply({ embeds: [getPlayerStats] });
                break;    
            }

            await message.reply({ embeds: [getPlayerStats] });
            break;
    }
}

/************************************************** */
/************************************************** */

module.exports = {
    name: 'casual',
    description: "Seasonal **CASUAL** stats",
    execute
}
