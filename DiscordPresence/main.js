import DiscordRPC from "discord-rpc";
import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 9900 })

const clientId = "840750979824877591";

const rpc = new DiscordRPC.Client({transport: 'ipc'});

const startTimestamp = new Date();

function setActivity(title, url) {
	console.log(title);

	rpc.setActivity({
    details: `${title.substring(0, 127)}` || 'IDLING',
		state: url.substring(0, 127) || 'Humming',
    startTimestamp,
    largeImageKey: 'main',
    largeImageText: url.substring(0, 127) || "IDLING",
		spectateSecret: url,
    instance: false,
  });
}

rpc.on("ready", () => {
	wss.on('connection', ws => {
		ws.on('message', message => {
			setActivity(JSON.parse(message).name, JSON.parse(message).url);
		});
	});
});

rpc.login({clientId})
	.then(() => {
		console.log("App running!");
	})
	.catch(console.error);
