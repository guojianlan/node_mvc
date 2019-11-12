import { TeamRelationUser } from "@models/TeamRelationUser";
import { Team } from "@models/Team";
import { User } from "@models/User";
import { error } from "@config/error";
import { AppService } from "@service/app";
import { Op } from "sequelize";
import * as R from "ramda";
import { BaseService } from "../base";
import { Image } from "@models/Image";
import * as utils from "@utils/index";
import { sequelize } from "@libs/db";

/**
 *
 *
 * @export
 * @class UserService
 */
export class TeamService extends BaseService {
  async findTeamUser(userId: string) {
    let result = await TeamRelationUser.findAllByUserId(userId);
    // 根据teamid查找队伍数据
    let teamIds = result.map(team => team.teamId);
    let team = await Team.findAll({
      where: {
        id: {
          [Op.in]: teamIds
        }
      }
    });
    result.forEach((item, index) => {
      let result = team[index];
      if (!utils.isEmpty(result)) {
        Object.keys(result).forEach(key => {
          item[key] = result[key];
        });
      }
    });
    return this.setData(result);
  }
  async getTeamInfo(id) {
    // 获取team数据
    let teamData = await Team.findByPk(id);
    console.log(teamData);
    if (utils.isNil(teamData)) {
      return this.setWrong();
    }
    // 根据team获取人员数据
    let users = await TeamRelationUser.findAllByTeamId(id);
    let info = {
      teamItem: teamData,
      userList: users
    };
    return this.setData(info);
  }
  async addTeam(data, userId: string) {
    // 判断是否有image_id
    let teamImageValue = await AppService.findImageValue(
      data.headImageId,
      data.headImage
    );
    data.headImageId = teamImageValue.id;
    data.headImage = teamImageValue.uri;
    let { team, team_relation }: any = await sequelize.transaction(t => {
      return new Promise(async (resolve, reject) => {
        try {
          let team = await Team.create(data, { transaction: t });
          let team_relation = await TeamRelationUser.create(
            {
              teamId: (team.toJSON() as any).id,
              teamUserId: userId,
              nickname: data.nickname,
              isCreate: `1`
            },
            { transaction: t }
          );
          resolve({ team, team_relation });
        } catch (error) {
          reject(error);
        }
      });
    });

    let team_data = team.toJSON();
    let team_relation_data = team_relation.toJSON();
    //创建成功，插入关联表
    if (utils.isNil(team_data) && utils.isNil(team_relation_data)) {
      this.setWrong();
    }

    // 插入关联表
    return this.setData(team_data);
  }
  async joinTeam(data) {
    // 检测用户是否已经加入
    let teamData = await TeamRelationUser.findOne({
      where: {
        teamId: data.teamId,
        teamUserId: data.teamUserId
      }
    });
    if (!utils.isEmpty(teamData)) {
      return this.setWrong(error.teamReJoin[0], error.teamReJoin[1]);
    }
    let teamUserImageValue = await AppService.findImageValue(
      data.userHeaderImageId,
      data.userHeaderImage
    );
    data.userHeaderImageId = teamUserImageValue.id;
    data.userHeaderImage = teamUserImageValue.uri;
    let team_relation = (await new TeamRelationUser(data).save()).toJSON();
    return this.setData(team_relation);
  }
}
