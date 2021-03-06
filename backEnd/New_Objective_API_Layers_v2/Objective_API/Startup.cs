﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using businessLayer.Objective_API.Facades;
using businessLayer.Objective_API.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Model;
using Newtonsoft.Json;
using services.Objective_API.Services;

namespace Objective_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<LibraryContext>(
                options => options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")
            ));


            //Add facades here
            services.AddScoped<IObjectiveFacade, ObjectiveFacade>();
            services.AddScoped<ILabelFacade, LabelFacade>();
            services.AddScoped<IPlayerFacade, PlayerFacade>();
            services.AddScoped<IGuildFacade, GuildFacade>();
            services.AddScoped<IBattleFacade, BattleFacade>();
            services.AddScoped<IImageFacade, ImageFacade>();

            services.AddSignalR();

            services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder =>
            {
                builder.WithOrigins("http://localhost:8080", "http://localhost:8100")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }));

            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, LibraryContext objectiveLibrary)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAllOrigins");      

            app.UseMvc();

            app.UseSignalR(routes =>
            {
                routes.MapHub<BattleHub>("/battleHub");
            });

            DBInitializer.Initialize(objectiveLibrary);
        }
    }
}
