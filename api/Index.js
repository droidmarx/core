export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Método não permitido" });
	}
	
	const { username } = req.body;
	if (!username) {
		return res.status(400).json({ error: "O campo 'username' é obrigatório." });
	}
	
	const SECRET = "4e22fff5f896bb07f2e01e47e5061b80";
	const TOKEN = "PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
	
	try {
		const response = await fetch(`https://api.painelcliente.com/get_client/${TOKEN}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ secret: SECRET, username })
		});
		
		const data = await response.json();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar dados do cliente.", details: error.message });
	}
}
