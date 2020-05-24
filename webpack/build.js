import gitBranch from 'current-git-branch'
import webpack   from 'webpack'
import wpConfig  from './webpack.config'

webpack( wpConfig , (err,stats) => {
	if( err ){ console.error( err ) ; return 1 }
	const info = stats.toJson()
	if( stats.hasErrors()   ) console.error( info.errors )
	if( stats.hasWarnings() ) console.warn ( info.warnings )
  if( !stats.hasErrors() && !stats.hasWarnings() ){
    console.log( 'Build looks good!' )
    if( gitBranch() == 'master' ){
      console.log('Production deployment')
    }else if( gitBranch() ){
      console.log('Development deployment. Branch: ' + gitBranch() )
    }else{ console.error( 'Cant find git branch name!' ) }
    return 0
  }else{ return 1 }
})
