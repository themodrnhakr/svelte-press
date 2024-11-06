read -p "Enter the appropriate drizzle config env (drizzle-{env}.config.ts): " -r env

filename="drizzle-$env.config.ts"
echo $'\n - Using "'$filename$'" as drizzle-kit config file\n'

if test -f $filename; then
drizzle-kit generate --config=$filename
fi

if test ! -f $filename; then
echo $'\n ERROR: No file named "'$filename$'" was found'
fi
