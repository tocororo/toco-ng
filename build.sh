echo dame el nombre del proyecto project name?
read project

echo deploy url?
read url


ng build  $project --prod --aot --preserve-symlinks --build-optimizer=true  --verbose  --baseHref $url/$project --deploy-url $url/$project/


# ng build  organizations --prod --aot --preserve-symlinks --build-optimizer=true  --verbose  --baseHref https://cuor-lab.upr.edu.cu --deploy-url https://cuor-lab.upr.edu.cu/


# ng build  revistasmes --prod --aot --preserve-symlinks --build-optimizer=true  --verbose  --baseHref https://tocororo.upr.edu.cu/revistasmes --deploy-url https://tocororo.upr.edu.cu/revistasmes/