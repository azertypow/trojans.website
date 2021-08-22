import {IApiProject} from "@/api"

export interface ISortProjectsByYearParams {
  projects: IApiProject[]
}

export type ISortedProjectsByYear = {
  projectYear: number,
  projects: IApiProject[]
}[]

export function sortProjectsByYear({
                                     projects
}: ISortProjectsByYearParams): ISortedProjectsByYear {

    interface IProjectYear { projectYear: number, projects: IApiProject[] }

    const projectSortedByYear: IProjectYear[] = []

    for( const project of projects ) {
      if( project.date ) {
        const projectYear = new Date( project.date ).getFullYear()

        let projectAddedToArray = false

        for( const item of projectSortedByYear ) {
          if( item.projectYear === projectYear ) {
            item.projects.push( project )
            projectAddedToArray = true
            break
          }
        }

        if( !projectAddedToArray ) {
          projectSortedByYear.push({
            projects: [project],
            projectYear: projectYear
          })
        }
      }
    }

    function compare( a: IProjectYear, b: IProjectYear ) {
      if ( a.projectYear < b.projectYear ){
        return -1;
      }
      if ( a.projectYear > b.projectYear ){
        return 1;
      }
      return 0;
    }

    projectSortedByYear.sort( compare );

    return projectSortedByYear
}
