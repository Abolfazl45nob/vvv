const inventoryData = {
  Wood: 4,
  Stone: 10,
  'Iron Ore': 0,
  Torch: 0,
  Gel: 0,
  Coal: 0,
  Sand: 0,
  Dirt: 0,
  Glass: 0,
  'Gold Ore': 0
};

const recipes = [
  {
    result: 'Campfire',
    ingredients: [
      { item: 'Wood', count: 10 },
      { item: 'Stone', count: 1 }
    ]
  },
  {
    result: 'Workbench',
    ingredients: [{ item: 'Wood', count: 10 }]
  },
  {
    result: 'Torch',
    ingredients: [
      { item: 'Wood', count: 1 },
      { item: 'Gel', count: 1 }
    ]
  },
  {
    result: 'Glass',
    ingredients: [
      { item: 'Sand', count: 15 },
      { item: 'Coal', count: 1 }
    ]
  },
  {
    result: 'Iron Bar',
    ingredients: [
      { item: 'Iron Ore', count: 3 },
      { item: 'Coal', count: 1 }
    ]
  },
  {
    result: 'Anvil',
    ingredients: [{ item: 'Iron Bar', count: 12 }]
  }
];

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    target.classList.add('active');
  });
});

function renderInventory() {
  const list = document.getElementById('inventory-list');
  list.innerHTML = '';

  Object.keys(inventoryData).forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-row';

    const label = document.createElement('div');
    label.className = 'item-name';
    label.textContent = item;

    const input = document.createElement('input');
    input.type = 'number';
    input.value = inventoryData[item];
    input.addEventListener('input', (e) => {
      inventoryData[item] = Number(e.target.value) || 0;
      renderCrafting();
      renderQuests();
    });

    row.appendChild(label);
    row.appendChild(input);
    list.appendChild(row);
  });
}

function canCraft(ingredients) {
  return ingredients.every(item => {
    return (inventoryData[item.item] || 0) >= item.count;
  });
}

function renderCrafting() {
  const list = document.getElementById('crafting-list');
  list.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = `card ${canCraft(recipe.ingredients) ? 'success' : 'fail'}`;

    const title = document.createElement('h3');
    title.textContent = recipe.result;

    const details = document.createElement('div');

    recipe.ingredients.forEach(ing => {
      const p = document.createElement('p');
      p.textContent = `- ${ing.item}: ${ing.count}`;
      details.appendChild(p);
    });

    const status = document.createElement('p');
    status.textContent = canCraft(recipe.ingredients)
      ? '✅ می‌توانی بسازی'
      : '❌ مواد کافی نداری';

    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(status);
    list.appendChild(card);
  });
}

function renderQuests() {
  const list = document.getElementById('quests-list');
  list.innerHTML = '';

  const questList = [
    {
      title: 'کوست 1: جمع‌آوری چوب',
      description: 'حداقل 20 چوب داشته باش',
      done: (inventoryData.Wood || 0) >= 20
    },
    {
      title: 'کوست 2: ساخت آتش',
      description: 'Campfire بساز',
      done: (inventoryData.Wood || 0) >= 10 && (inventoryData.Stone || 0) >= 1
    },
    {
      title: 'کوست 3: ابزار ساده',
      description: 'Workbench بساز',
      done: (inventoryData.Wood || 0) >= 10
    },
    {
      title: 'کوست 4: منبع نور',
      description: 'Torch بساز',
      done: (inventoryData.Wood || 0) >= 1 && (inventoryData.Gel || 0) >= 1
    },
    {
      title: 'کوست 5: فلز',
      description: 'Iron Bar بساز',
      done: (inventoryData['Iron Ore'] || 0) >= 3 && (inventoryData.Coal || 0) >= 1
    }
  ];

  questList.forEach(quest => {
    const card = document.createElement('div');
    card.className = `quest-card ${quest.done ? 'success' : 'fail'}`;

    const title = document.createElement('h3');
    title.textContent = quest.title;

    const desc = document.createElement('p');
    desc.textContent = quest.description;

    card.appendChild(title);
    card.appendChild(desc);
    list.appendChild(card);
  });
}

renderInventory();
renderCrafting();
renderQuests();