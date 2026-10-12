const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const http = require('http');

// Configuration securisee
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const SITE_URL = "https://exprimes.github.io/dbd-maps/";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`[DBD Maps Bot] Connecté avec succès en tant que ${client.user.tag} !`);
  client.user.setActivity('Dead by Daylight | /aide', { type: 0 }); // Playing
});

// 1. Gestion des Commandes Slash (/)
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'site') {
    const embed = new EmbedBuilder()
      .setTitle('🌐 Site Officiel DBD MAP')
      .setDescription(`Accédez au site officiel pour consulter toutes les fonctionnalités, les cartes et télécharger le logiciel :\n👉 **${SITE_URL}**`)
      .setColor(0x3498DB);
    await interaction.reply({ embeds: [embed] });
  } 
  else if (commandName === 'telecharger') {
    const embed = new EmbedBuilder()
      .setTitle('📥 Téléchargement DBD MAP (v1.0.2)')
      .setDescription(`Téléchargez gratuitement la dernière version officielle de DBD MAP :\n\n💻 **Version PC (.exe) :** [Télécharger DBDMaps.exe](https://github.com/Exprimes/dbd-maps/releases/latest)\n📱 **Version Mobile (.apk) :** [Télécharger DBDMaps.apk](https://github.com/Exprimes/dbd-maps/releases/latest)\n📦 **Archive Portable (.zip) :** [Télécharger l'archive](https://github.com/Exprimes/dbd-maps/releases/latest)\n\n⚡ *Compatible Windows 10/11 sans installation requise.*`)
      .setColor(0x2ECC71);
    await interaction.reply({ embeds: [embed] });
  } 
  else if (commandName === 'maps') {
    const embed = new EmbedBuilder()
      .setTitle('🗺️ Cartes & Fonctionnalités Dead by Daylight')
      .setDescription(`• **43 cartes HD officielles** intégrées avec variantes de défilement\n• **Overlay transparent in-game** avec raccourcis F8 / F9\n• **Lobby Manager** : partage et synchronisation d'équipe en direct\n• **Reconnaissance OCR auto** de la map pendant l'écran de chargement`)
      .setColor(0x9B59B6);
    await interaction.reply({ embeds: [embed] });
  } 
  else if (commandName === 'aide') {
    const embed = new EmbedBuilder()
      .setTitle('📖 DBD MAP Assistant - Commandes Disponibles')
      .setDescription(`Voici les commandes que vous pouvez utiliser sur le serveur :\n\n• \`/site\` : Lien vers le site internet officiel\n• \`/telecharger\` : Liens de téléchargement directs PC & Mobile\n• \`/maps\` : Informations sur les 43+ cartes incluses\n• \`/aide\` : Affiche ce menu d'aide\n\n*(Les commandes avec préfixe \`!\` comme \`!site\` fonctionnent également)*`)
      .setColor(0xF1C40F);
    await interaction.reply({ embeds: [embed] });
  }
});

// 2. Gestion des Commandes Texte (!site, !telecharger, !maps, !aide)
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();

  if (content === '!site' || content === '!web') {
    const embed = new EmbedBuilder()
      .setTitle('🌐 Site Officiel DBD MAP')
      .setDescription(`Accédez au site officiel pour consulter toutes les fonctionnalités, les cartes et télécharger le logiciel :\n👉 **${SITE_URL}**`)
      .setColor(0x3498DB);
    await message.reply({ embeds: [embed] });
  } 
  else if (content === '!telecharger' || content === '!download') {
    const embed = new EmbedBuilder()
      .setTitle('📥 Téléchargement DBD MAP (v1.0.2)')
      .setDescription(`Téléchargez gratuitement la dernière version de DBD MAP :\n\n💻 **Version PC (.exe) :** [Télécharger DBDMaps.exe](https://github.com/Exprimes/dbd-maps/releases/latest)\n📱 **Version Mobile (.apk) :** [Télécharger DBDMaps.apk](https://github.com/Exprimes/dbd-maps/releases/latest)\n📦 **Archive Portable (.zip) :** [Télécharger l'archive](https://github.com/Exprimes/dbd-maps/releases/latest)`)
      .setColor(0x2ECC71);
    await message.reply({ embeds: [embed] });
  } 
  else if (content === '!maps' || content === '!cartes') {
    const embed = new EmbedBuilder()
      .setTitle('🗺️ Cartes & Fonctionnalités Dead by Daylight')
      .setDescription(`• **43 cartes HD officielles** intégrées\n• **Overlay transparent in-game**\n• **Lobby Manager synchro**`)
      .setColor(0x9B59B6);
    await message.reply({ embeds: [embed] });
  } 
  else if (content === '!aide' || content === '!help') {
    const embed = new EmbedBuilder()
      .setTitle('📖 DBD MAP Assistant - Commandes Disponibles')
      .setDescription(`Commandes disponibles :\n• \`!site\` ou \`/site\`\n• \`!telecharger\` ou \`/telecharger\`\n• \`!maps\` ou \`/maps\`\n• \`!aide\` ou \`/aide\``)
      .setColor(0xF1C40F);
    await message.reply({ embeds: [embed] });
  }
});

// 3. Mini-serveur web HTTP pour satisfaire les hébergeurs gratuits (Render / Koyeb)
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('DBD Maps Discord Bot is running 24/7 !');
}).listen(port, () => {
  console.log(`Serveur de statut actif sur le port ${port}`);
});

client.login(TOKEN);
