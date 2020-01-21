echo project name?

read project
ng build  $project --aot --preserve-symlinks --build-optimizer=true  --verbose  --baseHref https://tocororo.upr.edu.cu/$project --deploy-url https://tocororo.upr.edu.cu/$project/
