<?php
	echo($_POST);
?>
<html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Quix-o-tique</title>
	<link rel='stylesheet' href='app.css'>
	<link rel='stylesheet' href='game.css'>
</head>
<body>
	<div class="container">
		<div id="loader"></div>
		<div id="game" class="justify-center flex-column hidden">
			<div id="hud">
				<div id="hud-item">
					<p id='progressText' class="hud-prefix">
						Question
					</p>
					<!--
						<h1 class="hud-text" id='questionCounter'></h1>
						</h1>
					-->
					<div id="progressBar">
						<div id="progressDisplay"></div>
					</div>
				</div>
				<div id="hud-item" >
					<p class="hud-prefix">
						Score
					</p>
					<h1 class="hud-text" id='score'>
						0
					</h1>
				</div>
			</div>
			<h2 id="question"></h2>
			<div class="choice-container">
				<p class="choice-option"></p>
				<p class="choice-text" data-number="1"></p>
			</div>

			<div class="choice-container">
				<p class="choice-option"></p>
				<p class="choice-text" data-number="2"></p>
			</div>

			<div class="choice-container">
				<p class="choice-option"></p>
				<p class="choice-text" data-number="3"></p>
			</div>

			<div class="choice-container">
				<p class="choice-option"></p>
				<p class="choice-text" data-number="4"></p>
			</div>
		</div>
	</div>
	<script src="game.js"></script>
</body>
</html>