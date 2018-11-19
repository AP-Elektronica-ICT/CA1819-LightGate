using dataLayer.Objective_API.Model;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace services.Objective_API.Services
{
    public interface IGuildFacade
    {
        List<Guild> GetGuildsLibrary();
        Guild GetGuild(Guid id);
        void CreateGuild(Guild newGuild);
    }
}
