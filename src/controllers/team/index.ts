import { Controller, Get, Post } from "@decorator/index";
import { RouterContext } from "koa-router";
import { sessMiddleware, bodyparser } from "@src/routerMiddlewares";
import { TeamService } from "@service/team";
import { TeamSchema } from "@schema/team/index";
import * as utils from "@utils/index";

@Controller("/api/team", {
  priority: 3,
  middlewares: [sessMiddleware]
})
class Team {
  @Post("/join/:id", {
    middlewares: [bodyparser]
  })
  async joinTeam(ctx: RouterContext) {
    let { id } = ctx.params;
    let data = utils.normalizeData(
      ["nickname", "positionType", "userHeaderImage", "userHeaderImageId"],
      ctx.request.body
    );
    let rules = new TeamSchema("joinTeam");
    if (!(await rules.validator(data))) {
      return ctx.injectResponse.failParameter(rules.errors);
    }
    data.teamUserId = ctx.session.users.userId;
    data.teamId = id;
    if (data.userHeaderImageId != "") {
      data.userHeaderImageId = utils.hashDecrypt(data.userHeaderImageId);
    }
    let teamservice = new TeamService();
    if (!(await teamservice.joinTeam(data))) {
      return ctx.injectResponse.failService(teamservice);
    }
    ctx.injectResponse.success(teamservice.getData());
  }
  @Get("/:id")
  async getTeam(ctx: RouterContext) {
    let data = utils.normalizeData(["id"], ctx.params);
    if (data.id == 0) {
      return ctx.injectResponse.fail();
    }
    let team = new TeamService();
    if (!(await team.getTeamInfo(data.id))) {
      return ctx.injectResponse.fail();
    }
    ctx.injectResponse.success(team.getData());
  }

  @Post("/", {
    middlewares: [bodyparser]
  })
  async addTeam(ctx: RouterContext) {
    // 创建队伍
    let data: {
      name: string;
      address: string;
      headImage: string;
      headImageId: string;
      introduction: string;
    };
    data = utils.normalizeData(
      [
        "name",
        "address",
        "headImage",
        "headImageId",
        "introduction",
        "nickname",
        "userHeaderImage",
        "userHeaderImageId"
      ],
      ctx.request.body
    );
    let rules = new TeamSchema();
    if (!(await rules.validator(data))) {
      return ctx.injectResponse.failParameter(rules.errors);
    }
    // 解密head_image_id

    if (data.headImageId != "") {
      data.headImageId = utils.hashDecrypt(data.headImageId);
    }
    let teamService = new TeamService();
    if (!(await teamService.addTeam(data, ctx.session.users.userId))) {
      return ctx.injectResponse.fail();
    }
    //返回列表
    let teamData = teamService.getData();
    // 修改返回加密的图片id
    teamData.headImageId =
      teamData.headImageId == ""
        ? ""
        : utils.hashEncryption(teamData.headImageId);
    return ctx.injectResponse.success(teamData);
    // console.log(utils.normalizeData(['name',"address","head_image","head_image_id"],ctx.request.body))
    // 验证图片是否存在
  }
  @Get("/")
  async getTeamList(ctx: RouterContext) {
    // 获取用户的队伍列表
    let teamService = new TeamService();
    if (!(await teamService.findTeamUser(ctx.session.users.userId))) {
      return ctx.injectResponse.fail();
    }
    let reuslt: any = {
      list: []
    };
    let $data = teamService.getData();
    if ($data.length > 0) {
      reuslt.list = $data;
    }
    return ctx.injectResponse.success(reuslt);
  }
}
export = Team;
