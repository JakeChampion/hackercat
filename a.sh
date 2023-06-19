set -eux
if fastly service describe --quiet --service-name="hn-243" --profile personal ; then
  FASTLY_SERVICE_ID="$(fastly service describe --service-name="hn-243" --profile personal --quiet --json | jq -r '.ID')" fastly compute publish --verbose --profile personal
else
  fastly compute publish --verbose -i --profile personal
fi