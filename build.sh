echo dame el nombre del proyecto project name?
read project

echo deploy url?
read url


ng build  $project --prod --aot --preserve-symlinks --build-optimizer=true  --verbose  --baseHref $url/$project --deploy-url $url/$project/
