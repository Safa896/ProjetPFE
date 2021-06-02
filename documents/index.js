module.exports = (dataQuestions) => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
       </head>
       <body>
       <h1>Liste des questions en PDF</h1>
          <div >
             <table cellpadding="0" cellspacing="0">
                <tr class="information">
                   <td colspan="4">
                      <table>
                      <tr>
                      <th>Intitulé</th>
                      <th>Thème</th>
                      <th>Type</th>
                      <th>Statut</th>
                      <th>Réponse</th>
                    </tr>
                    ${dataQuestions.map(
                      (question, i) =>
                        ` <tr  key={i}>
                    <td>${question["entitled"]}</td>
                    <td>${question["theme"]}</td>
                    <td>${question["type"]}</td>
                    <td>${question["statut"]}</td>
                    <td>${question["responses"].length} </td>
                
                  </tr>`
                    )}
                      </table>
                   </td>
                </tr>
                
             </table>
             <br />
          </div>
       </body>
    </html>
    `;
};
