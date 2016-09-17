const test = require('tape')

test('child operators, sass', t => {
  runLint(t, [fixture('child-sass.scss')], res => {
    const warnings = res.results[0].warnings
    t.equal(warnings[0].rule, 'rscss/child-operator')
    t.equal(warnings[0].text, "Require child operator: '.component-name .badelement' (rscss/child-operator)")
  })
})

test('child operators', t => {
  runLint(t, [fixture('child-example.css')], res => {
    const warnings = res.results[0].warnings
    t.equal(warnings[0].rule, 'rscss/child-operator')
    t.equal(warnings[0].text, "Require child operator: 'a.bad-component .xyz .abc' (rscss/child-operator)")
  })
})

/*
 * Helpers
 */

function fixture (path) {
  return require('path').join(__dirname, 'fixtures', path)
}

function runLint (t, files, fn) {
  require('stylelint').lint({ files })
    .then(result => fn(result))
    .then(() => t.end())
    .catch(err => t.end(err))
}
