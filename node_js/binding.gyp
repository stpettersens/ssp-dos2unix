{
	'targets': [
		{
			'target_name': 'dos2unix',
			'include_dirs': [
				"<!(node -e \"require('nan')\")"
			],
			'sources': [ 'native/addon.cc', 'native/dos2unix.cc' ]
		}
	]
}
