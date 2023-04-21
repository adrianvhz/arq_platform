import sha1 from "sha1";
import { HOSTNAME } from "../../constants";

export default function logSSO(clientIP) {
	console.log({
		browser_agent: window.navigator.userAgent,
		client_ip: clientIP,
		browserAud: {
			clientIp: clientIP,
			clientId: window.navigator.userAgent,
			hostname: HOSTNAME
		}
	});

	console.log("sha1", {
		browserId: sha1(window.navigator.userAgent),
		browserIp: sha1(clientIP),
		browserAud: sha1(clientIP + window.navigator.userAgent + HOSTNAME),
	});

	console.log("hostname:", HOSTNAME);
}
