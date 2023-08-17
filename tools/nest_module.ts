import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';
import ora from 'ora';
import Handlebars from 'handlebars';

export async function genereteNestMModule(
	moduleName: string,
	entryPath: string,
) {
	const spinners = [ora('module生成中...')];
	spinners[0].start();

	fse.copy(
		path.resolve(entryPath, `../templates/admin`),
		`${moduleName}`,
		(err) => {
			if (err) {
				console.error(err);
				spinners[0].fail('创建失败');
			} else {
				spinners[0].succeed('module创建成功');
				renameFilesRecursive(moduleName, 'admin', moduleName);
			}
		},
	);
}

function renameFilesRecursive(dir: string, from: string, to: string) {
	fs.readdirSync(dir).forEach((it) => {
		const itsPath = path.resolve(dir, it);
		const itsStat = fs.statSync(itsPath);

		if (itsStat.isFile()) {
			const data = fs.readFileSync(itsPath, 'utf-8');
			const template = Handlebars.compile(data);
			fs.writeFileSync(
				itsPath,
				template({
					name: to,
					uperName:
						to.substring(0, 1).toUpperCase() + to.substring(1),
					repositoryName: to,
				}),
			);
		}

		if (itsPath.search(from) > -1) {
			fs.renameSync(itsPath, itsPath.replace(from, to));
		}

		if (itsStat.isDirectory()) {
			renameFilesRecursive(itsPath.replace(from, to), from, to);
		}
	});
}
