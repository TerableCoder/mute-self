module.exports = function MuteSelf(mod) {
	const command = mod.command || mod.require.command;

	mod.command.add(['math', 'muteme', 'muteself'], {
		$none() {
			mod.settings.enabled = !mod.settings.enabled;
			command.message(`Mute self now ${mod.settings.enabled ? '<font color="#56B4E9">[Enabled]' : '<font color="#E69F00">[Disabled]'}`);
		},
		add(channel) {
			channel = Number(channel);
			let message;
			if (!mod.settings.channels.includes(channel)) { 
				mod.settings.channels.push(channel)
				message = `<font color="#56B4E9">Channel [${channel}] now muted</font>`;
			} else {
				message = `<font color="#56B4E9">Channel [${channel}] already muted</font>`;
			}
			command.message(message);
		},
		remove(channel) {
			channel = Number(channel);
			if (mod.settings.channels.includes(channel)) {
				mod.settings.channels.splice(mod.settings.channels.indexOf(channel), 1);
				command.message(`<font color="#E69F00">Channel [${channel}] no longer muted</font>`);
			}
		},
		clean() {
			mod.settings.channels = [];
			command.message(`<font color="#E69F00">Channel mute listed cleaned`);
		},
		clear() {
			mod.settings.channels = [];
			command.message(`<font color="#E69F00">Channel mute listed cleared`);
		},
		list() {
			mod.command.message(`[ ${mod.settings.channels} ]`);
		},
		info() {
			command.message(`[Say-0] [Party-1] [Guild-2] [Area-3] [Trade-4] [Global-27]`);
			command.message(`[Party Notice-21] [Raid Notice-25] [Command?-22] [Whisper-7]`);
			command.message(`[Private Channel-11~18] [Bargain-19] [Announcement?-24]`);
			command.message(`[Megaphone-213] [Guild Advt-214] [Emote-26] [Greet-9] [Fishing Greet-10]`);
		},
		help() {
			command.message(`[Say-0] [Party-1] [Guild-2] [Area-3] [Trade-4] [Global-27]`);
			command.message(`[Party Notice-21] [Raid Notice-25] [Command?-22] [Whisper-7]`);
			command.message(`[Private Channel-11~18] [Bargain-19] [Announcement?-24]`);
			command.message(`[Megaphone-213] [Guild Advt-214] [Emote-26] [Greet-9] [Fishing Greet-10]`);
		}
	});

    mod.hook('C_CHAT', 1, { order: -100 }, (event) => {
        if (mod.settings.enabled && mod.settings.channels.includes(event.channel)) {
            if(event.channel != 10) command.message(`<font color="#FF0000">You muted yourself from channel [${event.channel}]</font>`); // non-fishing greet
            return false;
        }
    });
}