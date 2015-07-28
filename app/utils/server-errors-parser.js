export default function(resp, errors) {
  resp.errors.forEach(function(error) {
    var attribute = error.source.pointer.split('/')[3];
    errors.add(attribute, error.detail);
  });
}
