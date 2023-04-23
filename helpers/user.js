class User{
    constructor(osu_user, from_groningen){
        this.osu_id = osu_user.id;
        this.username = osu_user.username;
        this.join_date = new Date(osu_user.join_date).toISOString().slice(0, 19).replace('T', ' ');
        this.level = osu_user.statistics.level.current + osu_user.statistics.level.progress * 0.01;
        this.pp_rank = osu_user.statistics.global_rank ?? 0;
        this.pp = osu_user.statistics.pp ?? 0;
        this.ranked_score = osu_user.statistics.ranked_score;
        this.hit_accuracy = osu_user.statistics.hit_accuracy;
        this.play_count = osu_user.statistics.play_count;
        this.play_time = osu_user.statistics.play_time;
        this.total_score = osu_user.statistics.total_score;
        this.total_hits = osu_user.statistics.total_hits;
        this.maximum_combo = osu_user.statistics.maximum_combo;
        this.replays_watched = osu_user.statistics.replays_watched_by_others;
        this.is_ranked = osu_user.is_active ? 1 : 0;
        this.count_ss = osu_user.statistics.grade_counts.ss;
        this.count_ssh = osu_user.statistics.grade_counts.ssh;
        this.count_s = osu_user.statistics.grade_counts.s;
        this.count_sh = osu_user.statistics.grade_counts.sh;
        this.count_a = osu_user.statistics.grade_counts.a;
        this.country_rank = osu_user.statistics.country_rank ?? 0;
        this.country_code = osu_user.country.code;
        this.country_name = osu_user.country.name;
        this.from_groningen = from_groningen ? 1 : 0;
    }
}

module.exports = User;