addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	const url = new URL(request.url)
	const path = url.pathname
	if (path === '/pyrometer-notify-webhook') {
		try {
			const data = await request.text();
			const jsonDataArray = JSON.parse(data);
			

			// Events Types - https://gitlab.com/tezos-kiln/pyrometer#event-types
			

			const webhooks = {
				endorsed: 'https://discord.com/api/webhooks/<ids>',
				missed_endorsement: 'https://discord.com/api/webhooks/<ids>',
				bake: 'https://discord.com/api/webhooks/<ids>',
				baked: 'https://discord.com/api/webhooks/<ids>',
				missed_bake: 'https://discord.com/api/webhooks/<ids>',
				baker_unhealthy: 'https://discord.com/api/webhooks/<ids>',
				baker_recovered: 'https://discord.com/api/webhooks/<ids>',
				rpc_error: 'https://discord.com/api/webhooks/<ids>',
				rpc_error_resolved: 'https://discord.com/api/webhooks/<ids>',
				node_behind: 'https://discord.com/api/webhooks/<ids>',
				node_synced: 'https://discord.com/api/webhooks/<ids>',
				low_peer_count: 'https://discord.com/api/webhooks/<ids>',
				low_peer_count_resolved: 'https://discord.com/api/webhooks/<ids>',

			};
			
			const responses = [];
			
			for (const jsonData of jsonDataArray) {
				const kind = jsonData.kind;
				const webhookURL = webhooks[kind] || 'https://discord.com/api/webhooks/<ids>';
				
				if (webhookURL) {
					let formattedData = '';
	
					if (kind === 'endorsed') {
						formattedData = '```\n';
						formattedData += `Successful Attestation\n`;
						formattedData += `Level: ${jsonData.level}\n`;
						formattedData += `Cycle: ${jsonData.cycle}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}
					else if (kind === 'missed_endorsement') {
						formattedData = '```\n';
						formattedData += `Missed Attestation\n`;
						formattedData += `Level: ${jsonData.level}\n`;
						formattedData += `Cycle: ${jsonData.cycle}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}
					else if (kind === 'bake' || kind === 'baked') {
						formattedData = '```\n';
						formattedData += `Successfully Baked a Block\n`;
						formattedData += `Level: ${jsonData.level}\n`;
						formattedData += `Cycle: ${jsonData.cycle}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}
					else if (kind === 'missed_baked') {
						formattedData = '```\n';
						formattedData += `Missed Block Bake\n`;
						formattedData += `Level: ${jsonData.level}\n`;
						formattedData += `Cycle: ${jsonData.cycle}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}

					else if (kind === 'baker_unhealthy') {
						formattedData = '```\n';
						formattedData += `Baker Unhealthy\n`;
						formattedData += `Level: ${jsonData.level}\n`;
						formattedData += `Cycle: ${jsonData.cycle}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}
					else if (kind === 'baker_recovered') {
						formattedData = '```\n';
						formattedData += `Baker Healthy\n`;
						formattedData += `Level: ${jsonData.level}\n`;
						formattedData += `Cycle: ${jsonData.cycle}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}
					else if (kind === 'rpc_error'){
						formattedData = '```\n';
						formattedData += `Node: ${jsonData.node}\n`;
						formattedData += `Message: ${jsonData.message}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}

					else if ( kind == 'node_behind' || kind === 'rpc_error_resolved' || kind === 'node_synced' || kind === 'low_peer_count_resolved' || kind === 'low_peer_count'){
						formattedData = '```\n';
						formattedData += `Node: ${jsonData.node}\n`;
						formattedData += `Kind: ${jsonData.kind}\n`;
						formattedData += `Created: ${jsonData.createdAt}\n`;
						formattedData += '```';
					}
					
					else {
						formattedData = '```\n' + JSON.stringify(jsonData, null, 2) + '\n```';
					}
					
					const response = await fetch(webhookURL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							content: formattedData,
						}),
					});
					
					responses.push(response);
				}
			}
		
			return new Response(JSON.stringify(responses), { status: 200 });
		} catch (error) {
			// Handle JSON parsing error or other exceptions here
			return new Response('Error', { status: 400 });
		}
	}
		return new Response('Not Found', { status: 404 })
		
		//Redirect to a Customized Error Page

		//const errorPageURL = new URL('/404', url.origin);
		//return Response.redirect(errorPageURL, 301);
}