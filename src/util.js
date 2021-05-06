const XLSX = require('xlsx');

module.exports = function(req, body, url, res) {
	/* try to read the buffer */
	let wb;
	try {
		wb = XLSX.read(body, {type:'buffer'});
	} catch(e) { return res.status(500).send(e.message || e); }

	/* N parameter specifies worksheet index */
	const N = url.query.N ? parseInt(url.query.N,10) : 0;
	
	const addr = url.query.addr || null;
	const val = url.query.val || null;
	const name = url.query.name || null;

	if (addr != null && val != null) {
		XLSX.utils.sheet_add_aoa(wb.Sheets[wb.SheetNames[0]], [[val]], { origin: addr });
	}

	/* -1 -> return sheet names */
	if(N < 0) switch(url.query.t || "csv") {
		case "json": return res.status(200).send(JSON.stringify(wb.SheetNames.join("\n")));
		default: return res.status(200).send(wb.SheetNames.join("\n"));
	}

	/* find worksheet */
	if(N >= wb.SheetNames.length) return res.status(500).send(`Cannot find sheet ${N}`);
	const ws = wb.Sheets[wb.SheetNames[N]];

	/* result depends on "t" parameter:
	 * - json: AOA (sheet_to_json with header:1, raw: true)
	 * - html: HTML (using stream.to_html)
	 * default: CSV (using stream.to_csv)
	 */
	switch(url.query.t) {
		case "json": return res.status(200).json(XLSX.utils.sheet_to_json(ws, {header:1, raw:true}));
		case "html": return XLSX.stream.to_html(ws).pipe(res);
		case "file": 
			var newName;	
			if(name!=null){
				newName = name + '.xlsx';
			}else{
				newName = 'yourFile.xlsx'
			}
			// const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
			// res.header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			// res.header("Content-Disposition", `attachment; filename="${newName}"`);
			// return res.status(200).end(buf);
			res.setHeader('Content-Type', 'application/octet-stream');
			var wbopts = {
				type: 'base64',
				bookType: "xlsx",
				bookSST: false
			}
			var wbout = XLSX.write(wb, wbopts);
			return res.send({workbook: wbout, newName: newName});
		default: return XLSX.stream.to_csv(ws).pipe(res);
	}
};
