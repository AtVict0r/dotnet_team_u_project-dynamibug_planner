using AutoMapper;
using DynamiBugPlannerBackend.Data;
using DynamiBugPlannerBackend.Models;

namespace DynamiBugPlannerBackend.Configurations
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer()
        {
            CreateMap<BugFixModel, BugFixDTO>().ReverseMap();
            CreateMap<BugFixModel, CreateBugFixDTO>().ReverseMap();
            CreateMap<CommentModel, CommentDTO>().ReverseMap();
            CreateMap<CommentModel, CreateCommentDTO>().ReverseMap();
            CreateMap<ProjectModel, ProjectDTO>().ReverseMap();
            CreateMap<ProjectModel, UpdateProjectDTO>().ReverseMap();
            CreateMap<ProjectModel, CreateProjectDTO>().ReverseMap();
            CreateMap<ProjectModel, ProjectNamesDTO>().ReverseMap();
            CreateMap<ReportModel, ReportDTO>().ReverseMap();
            CreateMap<ReportModel, CreateReportDTO>().ReverseMap();
        }
    }
}