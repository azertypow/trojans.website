import {IApiProject} from "@/api"

interface IProjectSortedByYear extends IApiProject{
  index: number
}

interface IProjectYear {
  projectYear: number,
  projects: IProjectSortedByYear[]
}
